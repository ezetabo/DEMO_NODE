const { Router } = require('express');
const {signup , login} = require('../controllers/auth');
const { check } = require('express-validator');
const { emailExiste, validatePassword, validateLogin } = require('../helpers/validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/signup',[   
    check('email','Valid email is required').isEmail(),
    check('email').custom(emailExiste),
    check('password').custom(validatePassword),
    validarCampos
], signup);
    
router.post('/login', [
     check('email','Valid email is required').isEmail(),    
     check('password','password is required').not().isEmpty(),     
     validarCampos
], login);

module.exports = router;