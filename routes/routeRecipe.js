const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Créer une nouvelle recette
router.post('/recipes', recipeController.createRecipe);

// Récupérer toutes les recettes
router.get('/recipes', recipeController.getAllRecipes);

// Récupérer une recette par ID
router.get('/recipes/:id', recipeController.getRecipeById);

// Mettre à jour une recette par ID
router.put('/recipes/:id', recipeController.updateRecipe);

// Supprimer une recette par ID
router.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = router;
