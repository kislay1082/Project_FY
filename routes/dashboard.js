const express = require('express');
const router = express.Router();

// Dashboard Route - Check if the user is authenticated
router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.render('home/dashboard'); // Render the dashboard template if user is authenticated
    }
    res.redirect('/login'); // Redirect to login page if user is not authenticated
});

module.exports = router;
