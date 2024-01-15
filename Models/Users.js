// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Importez la configuration Sequelize

const User = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  modificationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  creationUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modificationUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = User;
