// src/controllers/userController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await userService.registerUser(email, name, password);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({
            error: "Registration failed",
            details: error.message
        })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.authenticateUser(email, password);
        if (!user) {
            res.status(401).send({ error: "Não autorizado!" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            "secret",
            { expiresIn: "3h" }
        )
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: "Falha no login!" });
    }
};

const getProfile = async (req, res) => {
    try {
        const id = req.userData.id;
        const user = await userService.getUserById(id);
        if (user) {
            res.send({
                name: user.name,
                email: user.email
            });
        }
        else {
            res.status(404).send({ error: 'Usuario não existe!' })
        }
    } catch (error) {
        res.status(500).send({
            error: "Falha na rota get Profile",
            statusError: 1
        })
    }
};

module.exports = {
    register,
    login,
    getProfile
};
