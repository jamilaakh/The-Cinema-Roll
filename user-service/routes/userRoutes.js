const express = require('express');
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to get a user by ID (protected with authentication)
router.get('/:id', authMiddleware, getUserById);

module.exports = router;
