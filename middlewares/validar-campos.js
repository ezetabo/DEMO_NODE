const { validationResult } = require("express-validator");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajeError = errors.array()[0].msg;
        return res.status(400).json({ error: mensajeError });
    }
    next();
}

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
        return res.status(400).json({
            error: 'The email or password is incorrect.'
        });
    }
    next();
}

module.exports = {
    validarCampos,
    validateLogin
}