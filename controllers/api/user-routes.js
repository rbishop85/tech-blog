const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    // Create a new user based on the data included in the request body
    const userData = await User.create(req.body);

    // Create session variables based on the newly created user
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login with a user
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted username
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Verify the posted password with the password stored in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout from current user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the current session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Check if username supplied username exists in database
router.get('/available/:username', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.params.username }
    });

    if (!userData) {
      res.status(404).json({ message: 'No User found with this username!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
