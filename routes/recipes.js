const { Router } = require('express');
const { storeRecipes, fetchRecipes, deleteRecipe,editRecipe } = require('../controllers/recipes');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.put('/',[
    validarJWT,    
    validarCampos    
],storeRecipes);

router.get('/', [
    validarJWT,    
    validarCampos    
], fetchRecipes);

module.exports = router;