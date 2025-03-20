// backend/routes/publicacionRoutes.js
const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

//? CREATE-----------------------------------------------------
router.post('/', publicacionController.createPublicacion);

//? GETS-----------------------------------------------------
router.get('/:id', publicacionController.getPublicacionById); // Obtener una publicación por ID
router.get('/', publicacionController.getAllPublicaciones); // Obtener todas las publicaciones

//? UPDATE-----------------------------------------------------
router.put('/:id', publicacionController.updatePublicacion); // Actualizar una publicación

//? DELETE-----------------------------------------------------
router.delete('/:id', publicacionController.deletePublicacion); // Eliminar una publicación

module.exports = router;