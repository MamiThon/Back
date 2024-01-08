const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3030;

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données');
  }
});

// Route principale
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
