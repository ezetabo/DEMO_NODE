const User = require('../models/user');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generarJWT, getExpiration } = require('../helpers/generar-jwt');



const signup = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const localId = uuidv4();
        const user = new User({ email, password, localId });
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
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
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({
                error: 'The email or password is incorrect.'
            });
        }
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