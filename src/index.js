const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const equipoSchema = require('./models/equipoSchema.js');
const equiposRoute = require('./routes/equipos');
app.use(equiposRoute);

const {
    serverPort,
    mdbUser,
    mdbPass,
    mdbHost,
    mdbPort,
    mdbName,
    mdbAuth } = require('./config');

const mongoURL = `mongodb://${mdbUser}:${mdbPass}@${mdbHost}:${mdbPort}/${mdbName}?authSource=${mdbAuth}`;

mongoose.connect(mongoURL, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.error("Error al conectar a la base de datos: " + err);
    } else {
        console.log("Conexón a la base de datos establecida correctamente.");
        app.listen(serverPort, () => console.log(`Listening on port ${serverPort}...`));
    }
});


