const express = require('express');
const { register, login, logout, refreshAccessToken, validateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refreshAccessToken);

// Add the validation route
router.get('/:userId/validate', validateUser);

module.exports = router;
