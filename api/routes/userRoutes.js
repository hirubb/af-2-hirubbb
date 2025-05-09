// /routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,getUserDetails, editMyDetails } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

//my details
router.get('/me', authenticate, getUserDetails);

router.put('/edit',authenticate, editMyDetails)

module.exports = router;
