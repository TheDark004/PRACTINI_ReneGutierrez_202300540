const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

//? CREATE-----------------------------------------------------
router.post('/', usuarioController.createNewUser);

//? GETS-----------------------------------------------------
router.get('/:id', usuarioController.getById); // Obtener un usuario por ID
router.get('/', usuarioController.getAllUsers); // Obtener todos los usuarios

//? UPDATE-----------------------------------------------------
router.put('/:id', usuarioController.updateUser); // Actualizar un usuario
router.put('/:id/cambiar-password', usuarioController.changePasswordUser); // Cambiar contraseña

//? DELETE-----------------------------------------------------
router.delete('/:id', usuarioController.deleteUser); // Eliminar un usuario

module.exports = router;