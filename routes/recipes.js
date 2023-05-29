const { Router } = require('express');
const { storeRecipes, fetchRecipes, deleteRecipe,editRecipe } = require('../controllers/recipes');
const router = Router();

router.post('/', [] ,storeRecipes);
router.get('/', [], fetchRecipes);
router.put('/', [], editRecipe);
router.delete('/', [], deleteRecipe);

module.exports = router;