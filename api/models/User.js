// /models/user.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures that email is unique
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
