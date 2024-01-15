// models/CommonFields.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

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

// models/CategoryRecipe.js
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

// models/CategoryIngredient.js
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


// models/Ingredient.js
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


// models/Recipe.js
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
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ...CommonFields,
});

// models/RecipeIngredient.js
const RecipeIngredient = sequelize.define('RecipeIngredient', {
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

// Define associations between models
Recipe.hasMany(CategoryRecipe);
CategoryRecipe.belongsTo(Recipe);

Ingredient.hasMany(CategoryIngredient);
CategoryIngredient.belongsTo(Ingredient);

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

module.exports = {
  CategoryRecipe,
  CategoryIngredient,
  Ingredient,
  Recipe,
  RecipeIngredient,
};
