// sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize = undefined;

if (process.env.NODE_ENV === 'test') {
  const SequelizeMock = require('sequelize-mock');

  sequelize = new SequelizeMock();
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });
}

module.exports = sequelize;
