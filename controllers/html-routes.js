const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
// Client side routes/views

// Route "/"
// Prevent non logged in users from viewing the homepage
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

// Route "/dashboard"

// Route "/dashboard/new" <-- new posts

// Route "/dashboard/edit/:id" <-- edit post

// Route "/post/:id"


module.exports = router;
