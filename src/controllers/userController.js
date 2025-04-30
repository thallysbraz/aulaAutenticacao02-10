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

};

const getProfile = async (req, res) => {

};

module.exports = {
    register,
    login,
    getProfile
};
