

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const nodemailer = require('nodemailer');

// Function to send an email with an itinerary
const sendEmail = async (email, itinerary) => {
  console.log(email)
  console.log(process.env.PASSWORD,process.env.USER)
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,  // Replace with your email
        pass: process.env.PASSWORD, // Replace with your email password
      }
    });

    // Email options
    let mailOptions = {
      from: process.env.USER, // Replace with your email
      to: email,
      subject: 'Your Travel Itinerary',
      html: `<h1>Your Travel Itinerary</h1>${itinerary}`
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
