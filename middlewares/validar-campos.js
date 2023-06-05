const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajeError = errors.array()[0].msg;
        return res.status(400).json({ error: mensajeError });
    }
    next();
}

module.exports = {
    validarCampos
}