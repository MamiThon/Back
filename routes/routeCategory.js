const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Créer une nouvelle recette
router.post('/', categoryController.createCategory);

// Récupérer toutes les recettes
router.get('/', categoryController.getAllRecipeCategories);

// Récupérer une recette par ID
router.get('/:id', categoryController.getRecipeCategoryById);

// Mettre à jour une recette par ID
router.put('/:id', categoryController.updateRecipeCategory);

// Supprimer une recette par ID
router.delete('/:id', categoryController.deleteRecipeCategory);
module.exports = router;
