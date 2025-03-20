// backend/models/publicacionModel.js
const pool = require('./dbconnection'); // Importamos la conexión desde dbConnection.js

class Publicacion {
    //? CREATE-----------------------------------------------------
    static async create(id_usuario, id_curso, id_catedratico, mensaje) {
        const query = 'INSERT INTO Publicaciones (id_usuario, id_curso, id_catedratico, mensaje) VALUES (?, ?, ?, ?)';
        const values = [id_usuario, id_curso, id_catedratico, mensaje];

        const [results] = await pool.query(query, values);
        return { id_publicacion: results.insertId, id_usuario, id_curso, id_catedratico, mensaje };
    }

    //? READ-----------------------------------------------------
    static async getAll() {
        const query = 'SELECT * FROM Publicaciones';
        const [results] = await pool.query(query);
        return results;
    }

    static async getById(id) {
        const query = 'SELECT * FROM Publicaciones WHERE id_publicacion = ?';
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            throw new Error('Publicación no encontrada');
        }
        return results[0];
    }

    //? UPDATE-----------------------------------------------------
    static async update(id, mensaje) {
        const query = 'UPDATE Publicaciones SET mensaje = ? WHERE id_publicacion = ?';
        const [results] = await pool.query(query, [mensaje, id]);

        if (results.affectedRows === 0) {
            throw new Error('Publicación no encontrada');
        }
        return results;
    }

    //? DELETE-----------------------------------------------------
    static async delete(id) {
        const query = 'DELETE FROM Publicaciones WHERE id_publicacion = ?';
        const [results] = await pool.query(query, [id]);

        if (results.affectedRows === 0) {
            throw new Error('Publicación no encontrada');
        }
        return results;
    }
}

module.exports = Publicacion;