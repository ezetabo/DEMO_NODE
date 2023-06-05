const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.pathRecipes = '/api/recipes';
        this.pathAuth= '/api/auth';

        this.concectarDB();
        this.middlewares();
        this.routes();
    }

    async concectarDB() {
        await dbConnection();
    }

    middlewares() {        
        this.app.use(cors());       
        this.app.use(express.json());        
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.pathRecipes, require('../routes/recipes'));
        this.app.use(this.pathAuth, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        });
    }

}

module.exports = Server;