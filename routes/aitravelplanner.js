const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables from .env file
require('dotenv').config();

// Set up Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

const passport = require('passport');

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    res.redirect('/login'); // User is not authenticated, redirect to login page
};

// Route for the main page, requiring authentication
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('home/aitravelplanner'); // Render the aitravelplanner template
});

module.exports = router;


// Handle form submission
router.post('/', async (req, res) => {
  try {
    const { city, country, arrival, departure, budget } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

    const prompt = `Generate a travel itinerary for visiting ${city}, ${country} from ${arrival} to ${departure} with a budget of ${budget} USD.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let itinerary = response.text().trim();
    console.log(itinerary)

    // Process the itinerary to format as HTML
    itinerary = itinerary
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text
      .replace(/Day \d+:/g, (match) => `<h2>${match}</h2>`) // Headings for days
      .replace(/\* (.*?)\n/g, '<li>$1</li>')  // List items
      .replace(/\n+/g, '') // Remove additional newlines
      .replace(/(Accommodation:|Transportation:|Activities:|Food and Drinks:|Total Estimated Cost:|Grand Total:)/g, '<h3>$1</h3>'); // Subheadings

    // Wrap the points in lists
    itinerary = itinerary.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
      return `${match}<ul>`;
    });
    itinerary = itinerary.replace(/<h3>(.*?)<\/h3>/g, '</ul><h3>$1</h3>');
    itinerary += '</ul>';

    req.session.itinerary = itinerary;
    res.redirect('/itinerary');
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).send('Error generating itinerary');
  }
});

module.exports = router;
