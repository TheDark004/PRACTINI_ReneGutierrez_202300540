// backend/routes/cursoRoutes.js
const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursosController');

//? CREATE-----------------------------------------------------
router.post('/', cursoController.createCurso);

//? GETS-----------------------------------------------------
router.get('/:id', cursoController.getCursoById); // Obtener un curso por ID
router.get('/', cursoController.getAllCursos); // Obtener todos los cursos

//? UPDATE-----------------------------------------------------
router.put('/:id', cursoController.updateCurso); // Actualizar un curso

//? DELETE-----------------------------------------------------
router.delete('/:id', cursoController.deleteCurso); // Eliminar un curso

module.exports = router;