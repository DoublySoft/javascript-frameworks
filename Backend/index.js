'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {userNewUrlParser: true})
    .then(() => {
        console.log('¡Eres un crack! También un loco. ¿Cómo hiciste eso?');

        // Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });
    });