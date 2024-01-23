const { Ingredient, CategoryIngredient, IngredientCategory } = require('../Models/recipe');

// Opération CREATE - Créer un nouvel ingrédient
async function createIngredient(req, res) {
  try {
    const { name, id_categorie_ingredient } = req.body;

    const newIngredient = await Ingredient.create({
      name,
      id_categorie_ingredient,
      creationUser: 'admin',
      modificationUser: 'admin',
    });

    // Si id_categorie_ingredient est fourni, ajouter l'association avec la catégorie
    if (id_categorie_ingredient) {
      const existingCategory = await CategoryIngredient.findByPk(id_categorie_ingredient);

      if (!existingCategory) {
        return res.status(400).json({ message: 'La catégorie d\'ingrédient spécifiée n\'existe pas.' });
      }

      await IngredientCategory.create({
        id_categorie_ingredient,
        id_ingredient: newIngredient.id,
        creationUser: 'admin',
        modificationUser: 'admin',
      });
    }

    return res.status(201).json({ ingredient: newIngredient });
  } catch (error) {
    console.error('Erreur lors de la création de l\'ingrédient :', error);
    return res.status(500).json({ message: 'Erreur lors de la création de l\'ingrédient.' });
  }
}

// Opération READ - Récupérer tous les ingrédients
async function getAllIngredients(req, res) {
  try {
    const ingredients = await Ingredient.findAll({
      include: [CategoryIngredient],
    });

    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des ingrédients.' });
  }
}

// Opération READ - Récupérer un ingrédient par ID
async function getIngredientByName(req, res) {
  try {
    const { name } = req.params;
    const ingredient = await Ingredient.findOne({ where: { name } });

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingrédient non trouvé.' });
    }

    return res.status(200).json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération de l\'ingrédient.' });
  }
}

// Opération UPDATE - Mettre à jour un ingrédient par ID
async function updateIngredient(req, res) {
  try {
    const { id } = req.params;
    const { name, id_categorie_ingredient } = req.body;

    const existingIngredient = await Ingredient.findByPk(id);

    if (!existingIngredient) {
      return res.status(404).json({ message: 'Ingrédient non trouvé.' });
    }

    await existingIngredient.update({
      name,
      id_categorie_ingredient,
      modificationUser: 'admin',
    });

    // Mettre à jour l'association avec la catégorie
    if (id_categorie_ingredient) {
      const existingCategory = await CategoryIngredient.findByPk(id_categorie_ingredient);

      if (!existingCategory) {
        return res.status(400).json({ message: 'La catégorie d\'ingrédient spécifiée n\'existe pas.' });
      }

      const ingredientCategory = await IngredientCategory.findOne({
        where: {
          id_categorie_ingredient,
          id_ingredient: existingIngredient.id,
        },
      });

      if (ingredientCategory) {
        await ingredientCategory.update({
          modificationUser: 'admin',
        });
      } else {
        await IngredientCategory.create({
          id_categorie_ingredient,
          id_ingredient: existingIngredient.id,
          creationUser: 'admin',
          modificationUser: 'admin',
        });
      }
    }

    return res.status(200).json(existingIngredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'ingrédient.' });
  }
}

// Opération DELETE - Supprimer un ingrédient par ID
async function deleteIngredient(req, res) {
  try {
    const { id } = req.params;
    const deletedIngredient = await Ingredient.findByPk(id);

    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingrédient non trouvé.' });
    }

    await deletedIngredient.destroy();

    // Supprimer l'association avec la catégorie
    await IngredientCategory.destroy({
      where: {
        id_ingredient: deletedIngredient.id,
      },
    });

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'ingrédient.' });
  }
}

module.exports = {
  createIngredient: createIngredient,
  getAllIngredients: getAllIngredients,
  getIngredientByName: getIngredientByName,
  updateIngredient: updateIngredient,
  deleteIngredient: deleteIngredient,
};
