const User = require('../models/user');
const { response } = require('express');
const { generarJWT, getExpiration } = require('../helpers/generar-jwt');
const { newUser } = require('../helpers/prepararUser');

const signup = async (req, res = response) => {
    try {
        const { email, password } = req.body;
       const user = newUser(email, password);
        const token = await generarJWT(user.localId);
        const expire = getExpiration(token);
        await user.save();
        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: token,
            expiresIn: expire
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'An unexpected error occurred. Please contact the administrator.'
        });
    }
}

const login = async (req, res = response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });   
        const token = await generarJWT(user.localId);
        const expire = getExpiration(token);
        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: token,
            expiresIn: expire
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'An unexpected error occurred. Please contact the administrator.'
        });
    }
}

module.exports = {
    signup,
    login
}