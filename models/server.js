const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = '/api/recetas';
        this.middlewares();
        this.routes();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path, require('../routes/recipes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        });
    }

}

module.exports = Server;