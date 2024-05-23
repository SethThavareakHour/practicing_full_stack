const express = require('express');
const router = express.Router();
const {
    register,
    login, 
    sendResetPassword, 
    resetPassword
} = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', sendResetPassword);
router.post('/reset-password/:id/:token', resetPassword);


module.exports = router;