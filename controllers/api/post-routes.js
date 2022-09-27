const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new Post
router.post('/new', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      // Utilize data sent over in the body as well as the currently logged in user
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE existing Post
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        // Update the post matching the id included in the parameters as long as it was also created by the logged in user 
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE existing post
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        // Delete the post matching the id included in the parameters as long as it was also created by the logged in user 
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
