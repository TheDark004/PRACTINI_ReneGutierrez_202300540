// backend/controllers/cursoController.js
const Curso = require('../models/cursosModels');

class CursoController {
    //? CREATE-----------------------------------------------------
    async createCurso(req, res) {
        try {
            const { codigo, nombre, creditos } = req.body;

            // Validar que los campos obligatorios estén presentes
            if (!codigo || !nombre || !creditos) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            // Crear el nuevo curso
            const nuevoCurso = await Curso.create(codigo, nombre, creditos);
            res.status(201).json({ message: 'Curso creado correctamente', curso: nuevoCurso });
        } catch (e) {
            console.error('Error al crear el curso:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? GETS-----------------------------------------------------
    async getCursoById(req, res) {
        try {
            const id = req.params.id;
            const curso = await Curso.getById(id);

            if (!curso) {
                return res.status(404).json({ error: 'Curso no encontrado' });
            }

            res.status(200).json(curso);
        } catch (e) {
            console.error('Error al obtener el curso:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    async getAllCursos(req, res) {
        try {
            const cursos = await Curso.getAll();
            res.status(200).json(cursos);
        } catch (e) {
            console.error('Error al obtener los cursos:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? UPDATE-----------------------------------------------------
    async updateCurso(req, res) {
        try {
            const id = req.params.id;
            const { nombre, creditos } = req.body;

            // Validar que haya datos para actualizar
            if (!nombre && !creditos) {
                return res.status(400).json({ error: 'Se requieren datos para actualizar' });
            }

            // Actualizar el curso
            await Curso.update(id, nombre, creditos);
            res.status(200).json({ message: 'Curso actualizado correctamente' });
        } catch (e) {
            console.error('Error al actualizar el curso:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? DELETE-----------------------------------------------------
    async deleteCurso(req, res) {
        try {
            const id = req.params.id;

            // Eliminar el curso
            await Curso.delete(id);
            res.status(200).json({ message: 'Curso eliminado correctamente' });
        } catch (e) {
            console.error('Error al eliminar el curso:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }
}

module.exports = new CursoController();