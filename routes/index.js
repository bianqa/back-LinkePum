const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const musicoController = require('../controllers/musicoController');
const publicacionController = require('../controllers/publicacionController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-user-exists', authController.checkUserExists);

router.get('/musico/:id', authMiddleware.authenticateToken, musicoController.getMusicoById);
router.get('/musico/:id/instrumentos', authMiddleware.authenticateToken, musicoController.getMusicoInstrumentos);
router.get('/user/me', authMiddleware.authenticateToken, musicoController.getUserMe);
router.delete('/user/delete', authMiddleware.authenticateToken, musicoController.deleteUser);
router.put('/user/update', authMiddleware.authenticateToken, musicoController.updateUser);

router.get('/publicaciones', publicacionController.getPublicaciones);
router.get('/users', userController.getAllUsers);

router.get('/', function (req, res, next) {
    res.status(200).json({ message: 'Welcome to Express!' });
});

module.exports = router;
