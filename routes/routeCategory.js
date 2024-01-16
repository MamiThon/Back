const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Créer une nouvelle recette
router.post('/RecipeCategory/', categoryController.createRecipeCategory);

// Récupérer toutes les recettes
router.get('/RecipeCategory/', categoryController.getAllRecipeCategories);

// Récupérer une recette par name
router.get('/RecipeCategory/:name', categoryController.getRecipeCategoryByName);

// Mettre à jour une recette par ID
router.put('/RecipeCategory/:id', categoryController.updateRecipeCategory);

// Supprimer une recette par ID
router.delete('/IngredientCategory/:id', categoryController.deleteRecipeCategory);

// Créer une nouvelle recette
router.post('/IngredientCategory/', categoryController.createIngredientCategory);

// Récupérer toutes les recettes
router.get('/IngredientCategory/', categoryController.getAllIngredientCategories);

// Récupérer une recette par name
router.get('/IngredientCategory/:name', categoryController.getIngredientCategoryByName);

// Mettre à jour une recette par ID
router.put('/IngredientCategory/:id', categoryController.updateIngredientCategory);

// Supprimer une recette par ID
router.delete('/IngredientCategory/:id', categoryController.deleteIngredientCategory);
module.exports = router;
