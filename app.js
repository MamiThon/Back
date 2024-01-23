const express = require('express');
const userRoutes = require('./routes/routeUser');

const app = express();
const port = 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisez le routeur pour les routes liées aux utilisateurs
app.use('/api/users', userRoutes);
app.get('/', (req,res,next)=>(res.send('Hello World')));

module.exports = app;