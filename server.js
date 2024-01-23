app = require('./app');
const sequelize = require('./sequelize');

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