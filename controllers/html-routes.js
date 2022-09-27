const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Routes for the various pages that will load

// Homepage that loads upon first visiting the site
router.get('/', async (req, res) => {
  try {
    // Passes the page data about all blog posts.
    const postData = await Post.findAll({
      include: [
        {
          // Includes the username of the user that posted each post
          model: User,
          attributes: ['username']
        },
      ],
      // Sorts the post list so that the newest posts are listed first
      order: [['created_at', 'DESC']],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Page
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

// Registration page
router.get('/register', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
     res.redirect('/');
     return;
   }
   res.render('register');
});

// User Dashboard page
router.get('/dashboard', withAuth, async (req, res) => {

  try {
    // Find the logged in user's data based on the session data.
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          // Include that user's posts
          model: Post,
        }
      ],
      // Order the posts based on which was updated the most recently
      order: [[Post, 'updated_at', 'DESC']],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// New blog post page
router.get('/newpost', withAuth, async (req, res) => {
  res.render('newPost', {
    logged_in: req.session.logged_in
  })

});



// Individual blog post page
router.get('/post/:id', async (req, res) => {
  try {
    // Loads a specific blog post based on the post id passed through the parameters.
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          // Info about the user that posted the blog post
          model: User,
          attributes: ['username'],
        },
        {
          // Comments that are attached tho the blog post
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'created_at'],
          include: [
            {
              // Comments include data about the user that posted them
              model: User,
              attributes: ['username']
            }
          ]
        },
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      logged_in_user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit blog post page
router.get('/edit/:id', async (req, res) => {
  try {
    // Find the specific post based on the parameter passed through the page
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
