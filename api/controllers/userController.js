// /controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name,username, email, password } = req.body;


    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (existingUsername) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login (for example)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, name:user.name,email:user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update current user details
exports.editMyDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, username, email, password } = req.body;

    // Find the current user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check for duplicate username or email if they're being changed
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername && existingUsername._id.toString() !== userId) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = email;
    }

    // Update name if provided
    if (name) user.name = name;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

