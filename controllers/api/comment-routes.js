const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new Comment
router.post('/new', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // Create a new comment using the info included in the request body, as well as the currently logged in user
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE existing Comment
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const postData = await Comment.destroy({
      where: {
        // Delete the comment matching the id included in the parameters as long as it was also created by the logged in user 
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
