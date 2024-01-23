const { CategoryRecipe, CategoryIngredient } = require('../Models/recipe');

// Opération CREATE - Créer une nouvelle catégorie
async function createRecipeCategory(req, res) {
  try {
    const { name } = req.body;

    const createdCategory = await CategoryRecipe.create({
      name,
    });
    if(name == null || name == ""){
      return res.status(404).json({ message: 'Erreur lors de la création de la catégorie name est vide.' });
    }
    return res.status(201).json({ message: 'Catégorie créée avec succès', category: createdCategory });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error.message);
    return res.status(500).json({ message: 'Erreur lors de la création de la catégorie.' });
  }
}

// Opération READ - Récupérer toutes les catégories de recettes
async function getAllRecipeCategories(req, res) {
  try {
    const categories = await CategoryRecipe.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des catégories de recettes.' });
  }
}

// Opération READ - Récupérer une catégorie de recette par ID
async function getRecipeCategoryByName(req, res) {
  try {
    const { name } = req.params; // Utilisez directement req.params
    const category = await CategoryRecipe.findOne({ where: { name } });

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie de recette.' });
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

    return res.status(200).json(existingCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie de recette.' });
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

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie de recette.' });
  }
}
// Opération CREATE - Créer une nouvelle catégorie
async function createIngredientCategory(req, res) {
  try {
    const { name } = req.body;

    const createdCategory = await CategoryIngredient.create({
      name,
    });

    return res.status(201).json({ message: 'Catégorie créée avec succès', category: createdCategory });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error.message);
    return res.status(400).json({ message: 'Erreur lors de la création de la catégorie.' });
  }
}

// Opération READ - Récupérer toutes les catégories de recettes
async function getAllIngredientCategories(req, res) {
  try {
    const categories = await CategoryIngredient.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des catégories de recettes.' });
  }
}

// Opération READ - Récupérer une catégorie de recette par ID
async function getIngredientCategoryByName(req, res) {
  try {
    const { name } = req.params;
    const category = await CategoryIngredient.findOne({ where: { name } });

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie de recette.' });
  }
}

// Opération UPDATE - Mettre à jour une catégorie de recette par ID
async function updateIngredientCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await CategoryIngredient.findByPk(id);

    if (!existingCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await existingCategory.update({ name });

    return res.status(200).json(existingCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie de recette.' });
  }
}

// Opération DELETE - Supprimer une catégorie de recette par ID
async function deleteIngredientCategory(req, res) {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryIngredient.findByPk(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }

    await deletedCategory.destroy();

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie de recette.' });
  }
}
module.exports = {
  createIngredientCategory: createIngredientCategory,
  getAllIngredientCategories: getAllIngredientCategories,
  getIngredientCategoryByName: getIngredientCategoryByName,
  updateIngredientCategory: updateIngredientCategory,
  deleteIngredientCategory: deleteIngredientCategory,

  createRecipeCategory: createRecipeCategory,
  getAllRecipeCategories: getAllRecipeCategories,
  getRecipeCategoryByName: getRecipeCategoryByName,
  updateRecipeCategory: updateRecipeCategory,
  deleteRecipeCategory: deleteRecipeCategory,
};
