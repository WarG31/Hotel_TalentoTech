const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/reservar', userController.reservar);
router.post('/logout', userController.logoutUser);
///////////////
router.get('/habitaciones', userController.obtenerHabitaciones);
////////////////

module.exports = router;
