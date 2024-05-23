// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// router.post('/itinerary/send-itinerary', async (req, res) => {
//   try {
//     // Extract the email address from the form data
//     const { email } = req.body;

//     // Create a Nodemailer transporter
//     let transporter = nodemailer.createTransport({
//       // Configuration options, such as SMTP settings
//     });

//     // Send the email
//     let info = await transporter.sendMail({
//       from: '"devanshgulati2002@gmail.com',
//       to: email,
//       subject: 'Your Itinerary',
//       text: 'Here is your itinerary...',
//       // HTML version of the email if you want to include HTML content
//     });

//     console.log('Message sent: %s', info.messageId);
//     res.send('Itinerary sent successfully');
    
//   } catch (error) {
//     console.error('Error sending itinerary:', error);
//     res.status(500).send('Error sending itinerary');
//   }
// });

// module.exports = router;
