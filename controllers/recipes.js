const { response } = require('express');

//# INI - Controladores para app Angular
const storeRecipes = async (req, res = response) => {

    try {
        const body = req.body;
        const recipe = body;
        res.status(200).json({
            recipe
        });
    } catch (error) {

    }
}

const fetchRecipes = async (req = request, res = response) => {

    try {
        const recipes = { "contenido": "esto deben ser recetas" };
        res.status(200).json(recipes);
    } catch (error) {

    }
}

const deleteRecipe = async (req = request, res = response) => {

    try {
        const recipe = { "contenido": "esto debe ser una receta existente para eliminar" };
        res.status(200).json(recipe);
    } catch (error) {

    }
}

const editRecipe = async (req = request, res = response) => {

    try {
        const body = req.body;
        const recipe = body;
        res.status(200).json(recipe);
    } catch (error) {

    }
}
//# FIN - Controladores para app Angular

module.exports = {
    storeRecipes,
    fetchRecipes,
    deleteRecipe,
    editRecipe
}