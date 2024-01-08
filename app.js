const express = require('express');
const app = express();
const port = 3030;

// Route principale
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
