// register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('home/register', { message: req.flash('error') });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      req.flash('error', 'User already exists');
      return res.redirect('/register');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user
    user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.redirect('/login'); // Redirect to login page after successful registration
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
