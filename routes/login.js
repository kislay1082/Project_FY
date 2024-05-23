// login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/user');
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('home/login', { message: req.flash('error') });
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Pass the error to the next middleware
    }
    if (!user) {
      req.flash('error', 'Incorrect username or password'); // Flash an error message
      return res.redirect('/login'); // Redirect to the login page
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard'); // Redirect to the dashboard on successful login
    });
  })(req, res, next);
});


// router.post('/', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).render('home/login', { error: 'Invalid credentials' });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).render('home/login', { error: 'Invalid credentials' });
//     }

//     // If credentials are valid, redirect to dashboard or home page
//     res.redirect('/dashboard'); // Replace '/dashboard' with the path you want to redirect to after successful login
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
