const usuario = require('../models/userModel'); // Importamos el modelo
const bcrypt = require('bcrypt');

class UsuarioController {
    //? CREATE-----------------------------------------------------
    async createNewUser(req, res) {
        try {
            const { registro_academico, nombres, apellidos, correo, contrasena } = req.body;

            // Validar que los campos obligatorios estén presentes
            if (!registro_academico || !nombres || !apellidos || !correo || !contrasena) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            // Validar formato del correo
            if (!correo.includes('@')) {
                return res.status(400).json({ error: 'El correo no tiene un formato válido' });
            }

            // Encriptar la contraseña
            const hashedContrasena = await bcrypt.hash(contrasena, 10);

            // Crear el nuevo usuario
            const nuevoUsuario = {
                registro_academico,
                nombres,
                apellidos,
                correo,
                contrasena: hashedContrasena
            };

            await usuario.create(nuevoUsuario);

            // Responder con un mensaje de éxito
            res.status(201).json({ message: 'Usuario creado correctamente', usuario: nuevoUsuario });
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'El correo o registro académico ya está registrado' });
            }
            console.error('Error al crear el usuario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? GETS-----------------------------------------------------
    async getById(req, res) {
        try {
            const id = req.params.id;
            const usuarioEncontrado = await usuario.getById(id);
            if (!usuarioEncontrado) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json(usuarioEncontrado);
        } catch (e) {
            console.error('Error al obtener el usuario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const usuarios = await usuario.getAll();
            res.status(200).json(usuarios);
        } catch (e) {
            console.error('Error al obtener los usuarios:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? UPDATE-----------------------------------------------------
    async updateUser(req, res) {
        try {
            const id = req.params.id; // Obtener el ID de los parámetros de la ruta
            const usuarioData = req.body; // Obtener los datos del cuerpo de la solicitud
    
            // Validar que haya datos para actualizar
            if (!usuarioData || Object.keys(usuarioData).length === 0) {
                return res.status(400).json({ error: 'Se requieren datos para actualizar' });
            }
    
            // Actualizar el usuario
            await usuario.update(id, usuarioData);
    
            // Responder con un mensaje de éxito
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        } catch (e) {
            console.error('Error al actualizar el usuario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    async changePasswordUser(req, res) {
        try {
            const { id, oldPassword, newPassword } = req.body;

            // Verificar que la contraseña actual sea correcta
            const usuario = await usuario.getById(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const isContrasenaValid = await bcrypt.compare(oldPassword, usuario.contrasena);
            if (!isContrasenaValid) {
                return res.status(401).json({ error: 'Contraseña actual incorrecta' });
            }

            // Encriptar la nueva contraseña
            const hashedContrasena = await bcrypt.hash(newPassword, 10);

            // Actualizar la contraseña
            await usuario.update(id, { contrasena: hashedContrasena });

            res.status(200).json({ message: 'Contraseña actualizada correctamente' });
        } catch (e) {
            console.error('Error al cambiar la contraseña:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? DELETE-----------------------------------------------------
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            await usuario.delete(id);
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (e) {
            console.error('Error al eliminar el usuario:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }
}

module.exports = new UsuarioController(); // Exportamos una instancia del controlador