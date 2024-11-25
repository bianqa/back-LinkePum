const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send('No token provided.');

    jwt.verify(token, SECRET_KEY, (err, musico) => {
        if (err) return res.status(403).send('Token invalid.');
        req.musico = musico;
        next();
   
    });
}