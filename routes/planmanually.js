const express = require('express');
const router = express.Router();

// Dashboard Route
router.get('/', (req, res) => {
    res.render('home/planmanually'); // Assuming your dashboard template is named "dashboard.pug"
});

module.exports = router;
