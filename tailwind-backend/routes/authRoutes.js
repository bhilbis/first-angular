const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require ('../models/user');

const router = express();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'server error'});
    }
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/users/:userId', authController.editPassword);
router.delete('/users/:userId', verifyToken, authController.deleteUser);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route' });
});

module.exports = router;
