// backend/models/cursoModel.js
const pool = require('./dbconnection'); // Importamos la conexión desde dbConnection.js

class Curso {
    //? CREATE-----------------------------------------------------
    static async create(codigo, nombre, creditos) {
        const query = 'INSERT INTO Cursos (codigo, nombre, creditos) VALUES (?, ?, ?)';
        const [results] = await pool.query(query, [codigo, nombre, creditos]);
        return { id_curso: results.insertId, codigo, nombre, creditos };
    }

    //? READ-----------------------------------------------------
    static async getAll() {
        const query = 'SELECT * FROM Cursos';
        const [results] = await pool.query(query);
        return results;
    }

    static async getById(id) {
        const query = 'SELECT * FROM Cursos WHERE id_curso = ?';
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            throw new Error('Curso no encontrado');
        }
        return results[0];
    }

    //? UPDATE-----------------------------------------------------
    static async update(id, nombre, creditos) {
        const query = 'UPDATE Cursos SET nombre = ?, creditos = ? WHERE id_curso = ?';
        const [results] = await pool.query(query, [nombre, creditos, id]);

        if (results.affectedRows === 0) {
            throw new Error('Curso no encontrado');
        }
        return results;
    }

    //? DELETE-----------------------------------------------------
    static async delete(id) {
        const query = 'DELETE FROM Cursos WHERE id_curso = ?';
        const [results] = await pool.query(query, [id]);

        if (results.affectedRows === 0) {
            throw new Error('Curso no encontrado');
        }
        return results;
    }
}

module.exports = Curso;