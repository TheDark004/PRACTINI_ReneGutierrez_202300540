// backend/routes/catedraticoRoutes.js
const express = require('express');
const router = express.Router();
const catedraticoController = require('../controllers/catedraticoController');

//? CREATE-----------------------------------------------------
router.post('/', catedraticoController.createCatedratico);

//? GETS-----------------------------------------------------
router.get('/:id', catedraticoController.getCatedraticoById); // Obtener un catedrático por ID
router.get('/', catedraticoController.getAllCatedraticos); // Obtener todos los catedráticos

//? UPDATE-----------------------------------------------------
router.put('/:id', catedraticoController.updateCatedratico); // Actualizar un catedrático

//? DELETE-----------------------------------------------------
router.delete('/:id', catedraticoController.deleteCatedratico); // Eliminar un catedrático

module.exports = router;