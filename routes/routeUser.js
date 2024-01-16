const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/', userController.createUser);
router.get('/:id',authenticateToken ,userController.getUserById);
router.get('/:name',authenticateToken ,userController.getUserByName);
router.put('/:id', authenticateToken,userController.updateUserById);
router.delete('/:id',authenticateToken ,userController.deleteUserById);
router.get('/',userController.getUserByEmailAndPassword);

module.exports = router;