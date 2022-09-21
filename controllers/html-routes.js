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
      order: [['updated_at', 'DESC']],
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
router.get('/dashboard', withAuth, async (req, res) => {

  try {
    // Find the logged in user's data based on the session data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Post,
        }
      ],
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


// Route "/dashboard/new" <-- new posts
router.get('/newpost', withAuth, async (req, res) => {
  res.render('newPost', {
    logged_in: req.session.logged_in
  })

});

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

router.get('/edit/:id', async (req, res) => {
  try {
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
