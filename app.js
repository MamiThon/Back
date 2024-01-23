const express = require('express');
const userRoutes = require('./routes/routeUser');
const recipeRoutes = require('./routes/routeRecipe');
const categoryRoutes = require('./routes/routeCategory');
const ingredientRoutes = require('./routes/routeIngredient');
const sequelize = require('./sequelize');

const app = express();
const port = 3030;

// bypass CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisez le routeur pour les routes liées aux utilisateurs
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.get('/', (req,res,next)=>(res.send('Hello World')));

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

module.exports = app;
