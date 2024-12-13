require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const token = req.headers['x-auth-token'];

    if (!token) {
        return res.status(403).json({ message: 'token not found' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            req.user = payload;
            next();
        }

    })
};

module.exports = verifyToken;