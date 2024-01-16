const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./Users');

const CommonFields = {
  creationUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updateUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

const CategoryRecipe = sequelize.define('CategoryRecipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ...CommonFields,
});

const CategoryIngredient = sequelize.define('CategoryIngredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ...CommonFields,
});

const IngredientCategory = sequelize.define('IngredientCategory', {
  id_categorie_ingredient: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_ingredient: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ...CommonFields,
});

const Ingredient = sequelize.define('Ingredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ...CommonFields,
});
const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instruction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nb_people: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ...CommonFields,
});

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  id_recette: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_ingredient: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ...CommonFields,
});
const RecipeCategory = sequelize.define('RecipeCategory', {
  id_categorie_recipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_recipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ...CommonFields,
});
// Relation Many-to-Many entre Recipe et CategoryRecipe
Recipe.belongsToMany(CategoryRecipe, { through: 'RecipeCategory', foreignKey: 'id_recipe' });
CategoryRecipe.belongsToMany(Recipe, { through: 'RecipeCategory', foreignKey: 'id_categorie_recipe' });

// Relation entre Ingredient et CategoryIngredient (Un ingrédient peut appartenir à une catégorie, mais une catégorie peut avoir plusieurs ingrédients)
Ingredient.belongsTo(CategoryIngredient, { foreignKey: 'id_categorie_ingredient' });
CategoryIngredient.hasMany(Ingredient, { foreignKey: 'id_categorie_ingredient' });

// Relation entre Recipe et User (Une recette appartient à un utilisateur, mais un utilisateur peut avoir plusieurs recettes)
Recipe.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Recipe, { foreignKey: 'id_user' });

// Relation entre Recipe et RecipeIngredient (Une recette peut avoir plusieurs ingrédients, et un ingrédient peut être utilisé dans plusieurs recettes)
Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'id_recette' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'id_ingredient' });

// Relation Many-to-Many entre Ingredient et CategoryIngredient
Ingredient.belongsToMany(CategoryIngredient, { through: 'IngredientCategory', foreignKey: 'id_ingredient' });
CategoryIngredient.belongsToMany(Ingredient, { through: 'IngredientCategory', foreignKey: 'id_categorie_ingredient' });

// Relation entre Recipe et RecipeCategory (Une recette peut appartenir à plusieurs catégories, et une catégorie peut avoir plusieurs recettes)
Recipe.belongsToMany(CategoryRecipe, { through: RecipeCategory, foreignKey: 'id_recipe' });
CategoryRecipe.belongsToMany(Recipe, { through: RecipeCategory, foreignKey: 'id_categorie_recipe' });

module.exports = {
  CategoryRecipe,
  CategoryIngredient,
  Ingredient,
  Recipe,
  RecipeIngredient,
  IngredientCategory,
  RecipeCategory,
};
