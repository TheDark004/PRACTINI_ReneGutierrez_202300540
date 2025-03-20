// backend/models/catedraticoModel.js
const pool = require('./dbconnection'); // Importamos la conexión desde dbConnection.js

class Catedratico {
    //? CREATE-----------------------------------------------------
    static async create(nombre) {
        const query = 'INSERT INTO Catedraticos (nombre) VALUES (?)';
        const [results] = await pool.query(query, [nombre]);
        return { id_catedratico: results.insertId, nombre };
    }

    //? READ-----------------------------------------------------
    static async getAll() {
        const query = 'SELECT * FROM Catedraticos';
        const [results] = await pool.query(query);
        return results;
    }

    static async getById(id) {
        const query = 'SELECT * FROM Catedraticos WHERE id_catedratico = ?';
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            throw new Error('Catedrático no encontrado');
        }
        return results[0];
    }

    //? UPDATE-----------------------------------------------------
    static async update(id, nombre) {
        const query = 'UPDATE Catedraticos SET nombre = ? WHERE id_catedratico = ?';
        const [results] = await pool.query(query, [nombre, id]);

        if (results.affectedRows === 0) {
            throw new Error('Catedrático no encontrado');
        }
        return results;
    }

    //? DELETE-----------------------------------------------------
    static async delete(id) {
        const query = 'DELETE FROM Catedraticos WHERE id_catedratico = ?';
        const [results] = await pool.query(query, [id]);

        if (results.affectedRows === 0) {
            throw new Error('Catedrático no encontrado');
        }
        return results;
    }
}

module.exports = Catedratico;