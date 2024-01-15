// controllers/userController.js
const User = require('../Models/Users');
const { authenticateToken } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
      creationDate: new Date(),
      modificationDate: new Date(),
      role: 'user',
      creationUser: 'admin',
      modificationUser: 'admin',
    });
    const token = jwt.sign({ userId: newUser.id, username: newUser.username }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};

exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      authenticateToken(req, res, async () => {
        const user = await User.findByPk(userId);
  
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
  
        res.status(200).json(user);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  };
  
  exports.updateUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      authenticateToken(req, res, async () => {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      const updatedUser = await existingUser.update({
        username,
        email,
        password,
        role: 'user',
        modificationDate: new Date(),
        modificationUser: 'admin',
      });
  
      res.status(200).json(updatedUser);
    });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  };
  
  exports.deleteUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      authenticateToken(req, res, async () => {
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      await existingUser.destroy();
  
      res.status(204).send();
    });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
  };
  exports.getUserByEmailAndPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
      const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({ user, token });
    } catch (error) {
      console.error('Erreur lors de l\'authentification de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification de l\'utilisateur' });
    }
  };
