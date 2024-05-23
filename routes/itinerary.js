const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail'); // Adjust the path to your sendEmail module
const { ensureAuthenticated } = require('../middleware/auth'); // Ensure this middleware checks for authentication

// Define the '/itinerary' route to render the generated itinerary
router.get('/', ensureAuthenticated, (req, res) => {
  const user = req.user;
  const itinerary = req.session.itinerary;
  if (!itinerary) {
    return res.redirect('/aitravelplanner');
  }
  res.render('home/itinerary', { itinerary, userEmail: user.email });
});

// Handle sending the itinerary email
// Handle sending the itinerary email
router.post('/send-itinerary', ensureAuthenticated, async (req, res) => {
    try {
      const email = req.user.email; // Passport.js stores user info in req.user
      const itinerary = req.session.itinerary;
      await sendEmail(email, itinerary);
      res.send('Itinerary sent to your email successfully!');
  
      // Redirect to "/itinerary" after 5 seconds
    
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending itinerary email');
    }
  });
  
module.exports = router;
