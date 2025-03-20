// backend/controllers/publicacionController.js
const Publicacion = require('../models/publicacionesModels');

class PublicacionController {
    //? CREATE-----------------------------------------------------
    async createPublicacion(req, res) {
        try {
            const { id_usuario, id_curso, id_catedratico, mensaje } = req.body;

            // Validar que los campos obligatorios estén presentes
            if (!id_usuario || !mensaje) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            // Crear la nueva publicación
            const nuevaPublicacion = await Publicacion.create(id_usuario, id_curso, id_catedratico, mensaje);
            res.status(201).json({ message: 'Publicación creada correctamente', publicacion: nuevaPublicacion });
        } catch (e) {
            console.error('Error al crear la publicación:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? GETS-----------------------------------------------------
    async getPublicacionById(req, res) {
        try {
            const id = req.params.id;
            const publicacion = await Publicacion.getById(id);

            if (!publicacion) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }

            res.status(200).json(publicacion);
        } catch (e) {
            console.error('Error al obtener la publicación:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    async getAllPublicaciones(req, res) {
        try {
            const publicaciones = await Publicacion.getAll();
            res.status(200).json(publicaciones);
        } catch (e) {
            console.error('Error al obtener las publicaciones:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? UPDATE-----------------------------------------------------
    async updatePublicacion(req, res) {
        try {
            const id = req.params.id;
            const { mensaje } = req.body;

            // Validar que haya datos para actualizar
            if (!mensaje) {
                return res.status(400).json({ error: 'Se requiere un mensaje para actualizar' });
            }

            // Actualizar la publicación
            await Publicacion.update(id, mensaje);
            res.status(200).json({ message: 'Publicación actualizada correctamente' });
        } catch (e) {
            console.error('Error al actualizar la publicación:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? DELETE-----------------------------------------------------
    async deletePublicacion(req, res) {
        try {
            const id = req.params.id;

            // Eliminar la publicación
            await Publicacion.delete(id);
            res.status(200).json({ message: 'Publicación eliminada correctamente' });
        } catch (e) {
            console.error('Error al eliminar la publicación:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }
}

module.exports = new PublicacionController();