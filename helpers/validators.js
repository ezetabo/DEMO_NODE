const User = require('../models/user');

const emailExiste = async (email = '') => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`The email: ${email}, is already registered.`);
    }
}

const validatePassword = async (pass = '') => {
    const passRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    const valid = passRegex.test(pass);
    if (!valid) {
        throw new Error(`The password must have at least 8 characters, 1 uppercase letter, and 1 number.`);
    }
}

module.exports = {
    emailExiste,
    validatePassword,
    
}