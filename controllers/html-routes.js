const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Client side routes/views

// Route "/"
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
      order: [['updated_at', 'ASC']],
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

// Route "/login"
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


router.get('/register', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
     res.redirect('/');
     return;
   }
  
   res.render('register');
});

// Route "/dashboard"
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
      order: [['updated_at', 'ASC']],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      // posts,
      // // Pass the logged in flag to the template
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route "/dashboard/new" <-- new posts

// Route "/dashboard/edit/:id" <-- edit post

// Route "/post/:id"
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'user_id', 'created_at'],
          include: [
            {
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
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
