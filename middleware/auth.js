// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(401).json({ msg: 'Token is not valid', decoded: decoded });
    }
};