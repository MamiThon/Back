const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Créer une nouvelle recette
router.post('/', recipeController.createRecipe);

// Récupérer toutes les recettes
router.get('/', recipeController.getAllRecipes);

// Récupérer une recette par ID
router.get('/:id', recipeController.getRecipeById);

// Mettre à jour une recette par ID
router.put('/:id', recipeController.updateRecipe);

// Supprimer une recette par ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
