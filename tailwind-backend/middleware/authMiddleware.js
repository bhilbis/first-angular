const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

exports.verifyToken = (req,res, next) => {
    const token = req.headers['authorization'];
    if (!token ) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token.split(' ')[1], secretKey , (err,decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        req.userId = decoded.userId;
        next();
    });
};