// src/controllers/userController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await userService.registerUser(email, name, password);
        res.status(200).send(user);
    } catch (error) {
        console.log('Registro deu erro: ', error);
        res.status(500).send({
            error: 'Registro falhou',
            details: error.message
        })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.authenticateUser(email, password);

        if (user) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                "secret",
                { expiresIn: "3h" }
            )
            res.send({ token })
        } else {
            res.status(401).send({ error: "Nao autorizad" });
        }
    } catch (error) {
        res.status(500).send({ error: "falha no login!" });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.userData.id;
        const user = await userService.getUserById(userId);

        if (user) {
            res.status(200).send({ name: user.name, email: user.email });
        }
        else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: "Falha ao buscar perfil do usuario" });
    }
};

module.exports = {
    register,
    login,
    getProfile
};
