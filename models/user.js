// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of email addresses
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
