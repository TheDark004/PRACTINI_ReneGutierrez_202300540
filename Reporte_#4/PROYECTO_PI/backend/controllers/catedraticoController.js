// backend/controllers/catedraticoController.js
const Catedratico = require('../models/catedraticoModels');

class CatedraticoController {
    //? CREATE-----------------------------------------------------
    async createCatedratico(req, res) {
        try {
            const { nombre } = req.body;

            // Validar que el nombre esté presente
            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es obligatorio' });
            }

            // Crear el nuevo catedrático
            const nuevoCatedratico = await Catedratico.create(nombre);
            res.status(201).json({ message: 'Catedrático creado correctamente', catedratico: nuevoCatedratico });
        } catch (e) {
            console.error('Error al crear el catedrático:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? GETS-----------------------------------------------------
    async getCatedraticoById(req, res) {
        try {
            const id = req.params.id;
            const catedratico = await Catedratico.getById(id);

            if (!catedratico) {
                return res.status(404).json({ error: 'Catedrático no encontrado' });
            }

            res.status(200).json(catedratico);
        } catch (e) {
            console.error('Error al obtener el catedrático:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    async getAllCatedraticos(req, res) {
        try {
            const catedraticos = await Catedratico.getAll();
            res.status(200).json(catedraticos);
        } catch (e) {
            console.error('Error al obtener los catedráticos:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? UPDATE-----------------------------------------------------
    async updateCatedratico(req, res) {
        try {
            const id = req.params.id;
            const { nombre } = req.body;

            // Validar que el nombre esté presente
            if (!nombre) {
                return res.status(400).json({ error: 'El nombre es obligatorio' });
            }

            // Actualizar el catedrático
            await Catedratico.update(id, nombre);
            res.status(200).json({ message: 'Catedrático actualizado correctamente' });
        } catch (e) {
            console.error('Error al actualizar el catedrático:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? DELETE-----------------------------------------------------
    async deleteCatedratico(req, res) {
        try {
            const id = req.params.id;

            // Eliminar el catedrático
            await Catedratico.delete(id);
            res.status(200).json({ message: 'Catedrático eliminado correctamente' });
        } catch (e) {
            console.error('Error al eliminar el catedrático:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }
}

module.exports = new CatedraticoController();