const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/routeUser');
const recipeRoutes = require('./routes/routeRecipe');

const app = express();
const port = 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisez uniquement Sequelize pour la gestion de la base de données
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée');
    // Écoute du serveur sur le port spécifié une fois que la base de données est synchronisée
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });

// Utilisez le routeur pour les routes liées aux utilisateurs
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
