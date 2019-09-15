const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

require('./models');

app.use(require('./routes'));

const { serverPort, mdbUser, mdbPass, mdbHost, mdbPort, mdbName, mdbAuth } = require('./utils/config');

const mongoURL = `mongodb://${mdbUser}:${mdbPass}@${mdbHost}:${mdbPort}/${mdbName}?authSource=${mdbAuth}`;

app.use(require('./middlewares/errorHandler'));

mongoose.connect(mongoURL, {useCreateIndex: true, useNewUrlParser: true}, (err) => {
    if (err) {
        return console.error(`Error al conectar a la base de datos: \n${err}`);
    } else {
        console.log("Conexón a la base de datos establecida correctamente.");
        app.listen(serverPort, () => console.log(`Escuchando en el puerto: ${serverPort}`));
    }
});


