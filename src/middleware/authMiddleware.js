// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, "secret")
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: "Falha na autenticação!" })
    }
};

module.exports = auth;
