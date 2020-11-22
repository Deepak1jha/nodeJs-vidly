const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('access denied no token provided');
    try {
        const decoded = jwt.verify(token, config.get('secretKey'));
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}