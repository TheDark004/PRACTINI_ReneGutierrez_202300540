// backend/controllers/comentarioController.js
const Comentario = require('../models/comentariosModels');

class ComentarioController {
    //? CREATE-----------------------------------------------------
    async createComentario(req, res) {
        try {
            const { id_publicacion, id_usuario, mensaje } = req.body;

            // Validar que los campos obligatorios estén presentes
            if (!id_publicacion || !id_usuario || !mensaje) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            // Crear el nuevo comentario
            const nuevoComentario = await Comentario.create(id_publicacion, id_usuario, mensaje);
            res.status(201).json({ message: 'Comentario creado correctamente', comentario: nuevoComentario });
        } catch (e) {
            console.error('Error al crear el comentario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? GETS-----------------------------------------------------
    async getComentarioById(req, res) {
        try {
            const id = req.params.id;
            const comentario = await Comentario.getById(id);

            if (!comentario) {
                return res.status(404).json({ error: 'Comentario no encontrado' });
            }

            res.status(200).json(comentario);
        } catch (e) {
            console.error('Error al obtener el comentario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    async getAllComentarios(req, res) {
        try {
            const comentarios = await Comentario.getAll();
            res.status(200).json(comentarios);
        } catch (e) {
            console.error('Error al obtener los comentarios:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? UPDATE-----------------------------------------------------
    async updateComentario(req, res) {
        try {
            const id = req.params.id;
            const { mensaje } = req.body;

            // Validar que haya datos para actualizar
            if (!mensaje) {
                return res.status(400).json({ error: 'Se requiere un mensaje para actualizar' });
            }

            // Actualizar el comentario
            await Comentario.update(id, mensaje);
            res.status(200).json({ message: 'Comentario actualizado correctamente' });
        } catch (e) {
            console.error('Error al actualizar el comentario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? DELETE-----------------------------------------------------
    async deleteComentario(req, res) {
        try {
            const id = req.params.id;

            // Eliminar el comentario
            await Comentario.delete(id);
            res.status(200).json({ message: 'Comentario eliminado correctamente' });
        } catch (e) {
            console.error('Error al eliminar el comentario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }
}

module.exports = new ComentarioController();