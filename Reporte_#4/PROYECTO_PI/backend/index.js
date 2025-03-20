const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // Para mejorar la seguridad
require('dotenv').config();

const port = process.env.PORT || 8000;

const routes = require('./routes/routes');

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.middlewares(); // Middlewares antes de las rutas
        this.routes();
    }

    config() {
        this.app.set('port', port);
    }

    middlewares() {
        this.app.use(express.json()); // Para parsear el cuerpo de las solicitudes a JSON
        this.app.use(morgan('dev')); // Logs de las solicitudes HTTP (usar 'combined' en producción)
        this.app.use(cors()); // Habilitar CORS
        this.app.use(helmet()); // Mejorar la seguridad
    }

    routes() {
        this.app.use('/', routes); // Usar las rutas definidas en routes.js
    }

    // Iniciar el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto', this.app.get('port'));
        });
    }
}

// Crear una instancia del servidor y iniciarlo
const server = new Server();
server.start();