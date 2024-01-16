const { Recipe, Ingredient, CategoryRecipe, RecipeIngredient, RecipeCategory } = require('../Models/recipe');

// Opération CREATE - Créer une nouvelle recette
async function createRecipe(req, res) {
  try {
    const { name, instruction, description, id_user, nb_people, ingredients, categories } = req.body;

    // Création de la recette
    const createdRecipe = await Recipe.create({
      name,
      instruction,
      description,
      id_user,
      nb_people,
    });

    // Ajout des ingrédients à la recette
    if (ingredients && ingredients.length > 0) {
      await Promise.all(
        ingredients.map(async (ingredient) => {
          const { id, quantity, unit } = ingredient;
          // Vérification si l'ingrédient existe déjà dans la base de données
          const existingIngredient = await Ingredient.findByPk(ingredient.id);
    
          // Si l'ingrédient n'existe pas, renvoyer une erreur
          if (!existingIngredient) {
            throw new Error(`L'ingrédient avec l'ID ${ingredient.id} n'existe pas.`);
          }
    
          // Ajout de l'ingrédient à la recette avec la quantité et l'unité
          await RecipeIngredient.create({
            id_recette: createdRecipe.id,
            id_ingredient: existingIngredient.id,
            quantity,
            unit,
          });
        })
      );
    }

    // Ajout des catégories à la recette
    if (categories && categories.length > 0) {
      await Promise.all(
        categories.map(async (categoryId) => {
          // Vérification si la catégorie existe déjà dans la base de données
          const existingCategory = await CategoryRecipe.findByPk(categoryId.id);

          // Si la catégorie n'existe pas, renvoyer une erreur
          if (!existingCategory) {
            throw new Error(`La catégorie avec l'ID ${categoryId} n'existe pas.`);
          }

          // Ajout de la catégorie à la recette
          await RecipeCategory.create({
            id_categorie_recipe: existingCategory.id,
            id_recipe: createdRecipe.id,
          });
        })
      );
    }
    res.status(201).json({ message: 'Recette créée avec succès', recipe: createdRecipe });
  } catch (error) {
    console.error('Erreur lors de la création de la recette:', error.message);
    res.status(400).json({ message: error.message });
  }
}
// Opération READ - Récupérer toutes les recettes du blogs
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.findAll({
      include: [Ingredient, CategoryRecipe],
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des recettes.' });
  }
}

// Opération READ - Récupérer une recette par ID
async function getRecipeById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id, {
      include: [Ingredient, CategoryRecipe],
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la recette.' });
  }
}
async function getRecipeByName(req, res) {
  try {
    const { name } = req.params;
    const recipe = await Recipe.findOne({
      where: { name },
      include: [Ingredient, CategoryRecipe],
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la recette.' });
  }
}
async function getRecipeByUser(req, res) {
  try {
    const { id_user } = req.params;
    const recipe = await Recipe.findOne({
      where: { id_user },
      include: [Ingredient, CategoryRecipe],
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la recette.' });
  }
}
async function getRecipesByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const recipes = await Recipe.findAll({
      include: [
        {
          model: CategoryRecipe,
          where: { id: categoryId },
          attributes: [],
        },
        Ingredient,
        CategoryRecipe,
      ],
    });

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: 'Aucune recette trouvée pour cette catégorie.' });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des recettes par catégorie.' });
  }
}

// Opération UPDATE - Mettre à jour une recette par ID t
async function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    const { name, instruction, description, id_user, nb_people, ingredients, categories } = req.body;

    const existingRecipe = await Recipe.findByPk(id);

    if (!existingRecipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    await existingRecipe.update({
      name,
      instruction,
      description,
      id_user,
      nb_people,
    });

    // Mettre à jour les ingrédients de la recette
    if (ingredients && ingredients.length > 0) {
      // Supprimer les anciens ingrédients liés à la recette
      await RecipeIngredient.destroy({ where: { id_recette: existingRecipe.id } });

      // Ajouter les nouveaux ingrédients
      await Promise.all(
        ingredients.map(async (ingredient) => {
          const { id, quantity, unit } = ingredient;
          // Vérification si l'ingrédient existe déjà dans la base de données
          const existingIngredient = await Ingredient.findByPk(id);

          // Si l'ingrédient n'existe pas, renvoyer une erreur
          if (!existingIngredient) {
            throw new Error(`L'ingrédient avec l'ID ${id} n'existe pas.`);
          }

          // Ajout de l'ingrédient à la recette avec la quantité et l'unité
          await RecipeIngredient.create({
            id_recette: existingRecipe.id,
            id_ingredient: existingIngredient.id,
            quantity,
            unit,
          });
        })
      );
    }

    // Mettre à jour les catégories de la recette
    if (categories && categories.length > 0) {
      // Supprimer les anciennes catégories liées à la recette
      await RecipeCategory.destroy({ where: { id_recipe: existingRecipe.id } });

      // Ajouter les nouvelles catégories
      await Promise.all(
        categories.map(async (categoryId) => {
          // Vérification si la catégorie existe déjà dans la base de données
          const existingCategory = await CategoryRecipe.findByPk(categoryId.id);

          // Si la catégorie n'existe pas, renvoyer une erreur
          if (!existingCategory) {
            throw new Error(`La catégorie avec l'ID ${categoryId.id} n'existe pas.`);
          }

          // Ajout de la catégorie à la recette
          await RecipeCategory.create({
            id_categorie_recipe: existingCategory.id,
            id_recipe: existingRecipe.id,
          });
        })
      );
    }

    res.status(200).json({ message: 'Recette mise à jour avec succès', recipe: existingRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la recette.' });
  }
}

// Opération DELETE - Supprimer une recette par ID
async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByPk(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    await deletedRecipe.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la recette.' });
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipeByName,
  getRecipesByCategory,
  getRecipeByUser,
};
