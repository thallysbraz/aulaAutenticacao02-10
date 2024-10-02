// src/services/userService.js
const userRepository = require('../repository/userRepository');
const bcrypt = require('bcrypt');

async function registerUser(email, name, password) {

}

async function authenticateUser(email, password) {

}

async function getUserById(id) {

}

module.exports = {
    registerUser,
    authenticateUser,
    getUserById
};
