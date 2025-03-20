// backend/routes/comentarioRoutes.js
const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

//? CREATE-----------------------------------------------------
router.post('/', comentarioController.createComentario);

//? GETS-----------------------------------------------------
router.get('/:id', comentarioController.getComentarioById); // Obtener un comentario por ID
router.get('/', comentarioController.getAllComentarios); // Obtener todos los comentarios

//? UPDATE-----------------------------------------------------
router.put('/:id', comentarioController.updateComentario); // Actualizar un comentario

//? DELETE-----------------------------------------------------
router.delete('/:id', comentarioController.deleteComentario); // Eliminar un comentario

module.exports = router;