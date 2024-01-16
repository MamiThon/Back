const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

// Créer une nouvelle ingredient
router.post('/', ingredientController.createIngredient);

// Récupérer toutes les ingredients
router.get('/', ingredientController.getAllIngredients);

// Récupérer une ingredient par ID
router.get('/:name', ingredientController.getIngredientByName);

// Mettre à jour une ingredient par ID
router.put('/:id', ingredientController.updateIngredient);

// Supprimer une ingredient par ID
router.delete('/:id', ingredientController.deleteIngredient);
module.exports = router;
