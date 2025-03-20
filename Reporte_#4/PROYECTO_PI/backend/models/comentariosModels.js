// backend/models/comentarioModel.js
const pool = require('./dbconnection'); // Importamos la conexión desde dbConnection.js

class Comentario {
    //? CREATE-----------------------------------------------------
    static async create(id_publicacion, id_usuario, mensaje) {
        const query = 'INSERT INTO Comentarios (id_publicacion, id_usuario, mensaje) VALUES (?, ?, ?)';
        const values = [id_publicacion, id_usuario, mensaje];

        const [results] = await pool.query(query, values);
        return { id_comentario: results.insertId, id_publicacion, id_usuario, mensaje };
    }

    //? READ-----------------------------------------------------
    static async getAll() {
        const query = 'SELECT * FROM Comentarios';
        const [results] = await pool.query(query);
        return results;
    }

    static async getById(id) {
        const query = 'SELECT * FROM Comentarios WHERE id_comentario = ?';
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            throw new Error('Comentario no encontrado');
        }
        return results[0];
    }

    //? UPDATE-----------------------------------------------------
    static async update(id, mensaje) {
        const query = 'UPDATE Comentarios SET mensaje = ? WHERE id_comentario = ?';
        const [results] = await pool.query(query, [mensaje, id]);

        if (results.affectedRows === 0) {
            throw new Error('Comentario no encontrado');
        }
        return results;
    }

    //? DELETE-----------------------------------------------------
    static async delete(id) {
        const query = 'DELETE FROM Comentarios WHERE id_comentario = ?';
        const [results] = await pool.query(query, [id]);

        if (results.affectedRows === 0) {
            throw new Error('Comentario no encontrado');
        }
        return results;
    }
}

module.exports = Comentario;