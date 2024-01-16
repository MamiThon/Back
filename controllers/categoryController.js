const { CategoryRecipe, CategoryIngredient } = require('../Models/recipe');

// Opération CREATE - Créer une nouvelle catégorie
async function createCategory(req, res) {
  try {
    const { name } = req.body;

    const createdCategory = await CategoryRecipe.create({
      name,
    });

    res.status(201).json({ message: 'Catégorie créée avec succès', category: createdCategory });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error.message);
    res.status(400).json({ message: 'Erreur lors de la création de la catégorie.' });
  }
}

// Opération READ - Récupérer toutes les catégories de recettes
async function getAllRecipeCategories(req, res) {
  try {
    const categories = await CategoryRecipe.findAll();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories de recettes.' });
  }
}

// Opération READ - Récupérer une catégorie de recette par ID
async function getRecipeCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category = await CategoryRecipe.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie de recette.' });
  }
}

// Opération UPDATE - Mettre à jour une catégorie de recette par ID
async function updateRecipeCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await CategoryRecipe.findByPk(id);

    if (!existingCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await existingCategory.update({ name });

    res.status(200).json(existingCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie de recette.' });
  }
}

// Opération DELETE - Supprimer une catégorie de recette par ID
async function deleteRecipeCategory(req, res) {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryRecipe.findByPk(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await deletedCategory.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie de recette.' });
  }
}

module.exports = {
  createCategory: createCategory,
  getAllRecipeCategories: getAllRecipeCategories,
  getRecipeCategoryById: getRecipeCategoryById,
  updateRecipeCategory: updateRecipeCategory,
  deleteRecipeCategory: deleteRecipeCategory,
};
