const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Créer une nouvelle recette
router.post('/', recipeController.createRecipe);

// Récupérer toutes les recettes
router.get('/', recipeController.getAllRecipes);

// afficher les 2 premiere recette
router.get('/hilights', recipeController.get2FirstRecipes);

// Récupérer une recette par ID_User
router.get('/user/:id_user', recipeController.getRecipeByUser);

// Récupérer une recette par ID
router.get('/name/:name', recipeController.getRecipeByName);

// Mettre à jour une recette par ID
router.put('/:id', recipeController.updateRecipe);

// Supprimer une recette par ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
