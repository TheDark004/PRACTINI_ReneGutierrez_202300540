const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');

class AuthController {
    //? REGISTRO-----------------------------------------------------
    async register(req, res) {
        try {
            const { registro_academico, nombres, apellidos, correo, contrasena } = req.body;
    
            // Mostrar los datos recibidos
            console.log('Datos recibidos:', { registro_academico, nombres, apellidos, correo, contrasena });
    
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
    
            // 2. Mostrar la contraseña encriptada
            console.log('Contraseña encriptada:', hashedContrasena);
    
            // Crear el nuevo usuario
            const nuevoUsuario = {
                registro_academico,
                nombres,
                apellidos,
                correo,
                contrasena: hashedContrasena
            };
    
            // 3. Mostrar el objeto del nuevo usuario antes de guardarlo
            console.log('Nuevo usuario a guardar:', nuevoUsuario);
    
            await Usuario.create(nuevoUsuario);
    
            // Responder con un mensaje de éxito
            res.status(201).json({ message: 'Usuario registrado correctamente', usuario: nuevoUsuario });
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'El correo o registro académico ya está registrado' });
            }
            console.error('Error al registrar el usuario:', e); // Este mensaje ya estaba en tu código
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }

    //? LOGIN-----------------------------------------------------
    async login(req, res) {
        try {
            const { identificador, contrasena } = req.body;
    
            // Validar que los campos obligatorios estén presentes
            if (!identificador || !contrasena) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
    
            let usuario;
    
            // Determinar si el identificador es un correo o un registro académico
            if (identificador.includes('@')) {
                // Buscar el usuario por correo
                usuario = await Usuario.getByEmail(identificador);
            } else {
                // Buscar el usuario por registro académico
                usuario = await Usuario.getByRegistroAcademico(identificador);
            }
    
            // Verificar si el usuario existe
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            // Verificar la contraseña
            const isContrasenaValid = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!isContrasenaValid) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            // Responder con un mensaje de éxito (podrías incluir un token JWT aquí si lo implementas más adelante)
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
        } catch (e) {
            console.error('Error al iniciar sesión:', e);
            res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
        }
    }
}

module.exports = new AuthController()