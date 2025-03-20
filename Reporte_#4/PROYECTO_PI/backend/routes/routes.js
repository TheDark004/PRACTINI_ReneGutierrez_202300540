const express = require('express');
const userRoutes = require('./userRoutes');
const publicacionesRoutes = require('./publicacionesRoutes');   
const authRoutes = require('./authRoutes');
const catedraticoRoutes = require('./catedraticoRoutes');
const cursoRoutes = require('./cursoRoutes');
const comentarioRoutes = require('./comentarioRoutes');


class Routes {
    constructor() {
        this.router = express.Router();
        this.config();
    }

    config() {
        //RUTA USUARIOS
        this.router.use('/users', userRoutes);
        //RUTA AUTH
        this.router.use('/auth', authRoutes);
        //RUTA CATEDRATICOS
        this.router.use('/catedraticos', catedraticoRoutes);
        //RUTA CURSOS
        this.router.use('/cursos', cursoRoutes);
        //RUTA PUBLICACIONES    
        this.router.use('/publicaciones', publicacionesRoutes);
        //RUTA COMENTARIOS
        this.router.use('/comentarios', comentarioRoutes);
    }
}

const routes = new Routes();
module.exports = routes.router;