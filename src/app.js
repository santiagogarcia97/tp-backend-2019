const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

require('./models/equipoSchema');
require('./models/jugadorSchema');
require('./models/dtSchema');
require('./models/eventoSchema');
require('./models/tipoEventoSchema');
require('./models/estadioSchema');
require('./models/partidoSchema');

app.use(require('./routes/routes'));

const {
    serverPort,
    mdbUser,
    mdbPass,
    mdbHost,
    mdbPort,
    mdbName,
    mdbAuth } = require('./config');

const mongoURL = `mongodb://${mdbUser}:${mdbPass}@${mdbHost}:${mdbPort}/${mdbName}?authSource=${mdbAuth}`;

mongoose.connect(mongoURL, {useNewUrlParser: true}, (err) => {
    if (err) {
        return console.error("Error al conectar a la base de datos: " + err);
    } else {
        console.log("Conexón a la base de datos establecida correctamente.");
        app.listen(serverPort, () => console.log(`Listening on port ${serverPort}...`));
    }
});


