const { response } = require('express');
const Recipe = require('../models/recipe');
const { getUID } = require('../helpers/generar-jwt');
const User = require('../models/user');

//# START - Controllers for Angular app
const storeRecipes = async (req, res = response) => {
    try {
        const recipes = req.body;
        const { email } = req.authUser;
        await Recipe.deleteMany({ userEmail: email });
        for (const recipeData of recipes) {
            const recipe = new Recipe(recipeData);
            recipe.userEmail = email;
            await recipe.save();
        }
        res.status(200).json({
            message: 'Recipes stored successfully'
        });
    } catch (error) {
        console.error('Error storing the recipes:', error);
        res.status(500).json({
            error: 'Error storing the recipes'
        });
    }
};

const fetchRecipes = async (req = request, res = response) => {
    try {
        const { email } = req.authUser;
        const recipes = await Recipe.find({ userEmail: email }).exec();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching the recipe(s):', error);
        res.status(500).json({
            error: 'Error fetching the recipe(s)'
        });
    }
}
//# END - Controllers for Angular app

module.exports = {
    storeRecipes,
    fetchRecipes
}
