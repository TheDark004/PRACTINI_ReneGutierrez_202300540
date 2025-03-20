const pool = require('./dbconnection'); // Asegúrate de que la ruta a la base de datos sea correcta

class Usuario {
    //? CREATE-----------------------------------------------------
    static async create(usuarioData) {
        const { registro_academico, nombres, apellidos, correo, contrasena } = usuarioData;

        // Validar campos obligatorios
        if (!registro_academico || !nombres || !apellidos || !correo || !contrasena) {
            throw new Error('Faltan campos obligatorios');
        }

        const query = 'INSERT INTO Usuarios (registro_academico, nombres, apellidos, correo, contrasena) VALUES (?, ?, ?, ?, ?)';
        const values = [registro_academico, nombres, apellidos, correo, contrasena];

        const [results] = await pool.query(query, values);
        return { registro_academico, ...usuarioData };
    }

    //? READ-----------------------------------------------------
    static async getAll() {
        const query = 'SELECT * FROM Usuarios';
        const [results] = await pool.query(query);
        return results;
    }

    static async getById(id) {
        const query = 'SELECT * FROM Usuarios WHERE id_usuario = ?';
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        return results[0];
    }

    static async getByEmail(correo) {
        const query = 'SELECT * FROM Usuarios WHERE correo = ?';
        const [results] = await pool.query(query, [correo]);

        if (results.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        return results[0];
    }
    
    static async getByRegistroAcademico(registro_academico) {
        const query = 'SELECT * FROM Usuarios WHERE registro_academico = ?';
        const [results] = await pool.query(query, [registro_academico]);
    
        if (results.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        return results[0];
    }

    //? UPDATE-----------------------------------------------------
    static async update(id, usuarioData) {
        const { nombres, apellidos, correo, contrasena } = usuarioData;
    
        // Validar que haya datos para actualizar
        if (!nombres && !apellidos && !correo && !contrasena) {
            throw new Error('Se requieren datos para actualizar');
        }
    
        // Construir la consulta SQL dinámicamente
        const updates = [];
        const values = [];
    
        if (nombres) {
            updates.push('nombres = ?');
            values.push(nombres);
        }
        if (apellidos) {
            updates.push('apellidos = ?');
            values.push(apellidos);
        }
        if (correo) {
            updates.push('correo = ?');
            values.push(correo);
        }
        if (contrasena) {
            updates.push('contrasena = ?');
            values.push(contrasena);
        }
    
        // Agregar el ID al final de los valores
        values.push(id);
    
        // Construir la consulta SQL
        const query = `UPDATE Usuarios SET ${updates.join(', ')} WHERE id_usuario = ?`;
    
        // Ejecutar la consulta
        const [results] = await pool.query(query, values);
    
        // Verificar si se actualizó algún registro
        if (results.affectedRows === 0) {
            throw new Error('Usuario no encontrado');
        }
    
        return results;
    }

    //? DELETE-----------------------------------------------------
    static async delete(id) {
        const query = 'DELETE FROM Usuarios WHERE id_usuario = ?';
        const [results] = await pool.query(query, [id]);

        if (results.affectedRows === 0) {
            throw new Error('Usuario no encontrado');
        }
        return results;
    }
}

module.exports = Usuario; // Exportamos la clase Usuario