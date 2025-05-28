const userRepository = require('../repository/userRepository');
const bcrypt = require('bcrypt');

async function registerUser(email, name, password) {
    try {
        console.log("input: ", {
            email, name, password
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        return await userRepository.createUser(email, name, hashedPassword);
    } catch (error) {
        console.log("Error na service registerUser", error);
        throw error;
    }
}

async function authenticateUser(email, password) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;

}

async function getUserById(id) {
    return userRepository.findUserById(id);
}

module.exports = {
    registerUser,
    authenticateUser,
    getUserById
};
