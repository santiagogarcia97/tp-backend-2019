const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

const teamRoute = require('./routes/equipos');
app.use(teamRoute);

const serverPort = process.env.SERVER_PORT || 3000;
const MDB_USER = process.env.MDB_USER;
const MDB_PASS = process.env.MDB_PASS;
const MDB_HOST = process.env.MDB_HOST;
const MDB_PORT = process.env.MDB_PORT;
const MDB_DB = process.env.MDB_DB;
const MDB_AUTHDB = process.env.MDB_AUTHDB;

const mongoURL = `mongodb://${MDB_USER}:${MDB_PASS}@${MDB_HOST}:${MDB_PORT}/${MDB_DB}?authSource=${MDB_AUTHDB}`;

mongoose.connect(mongoURL, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.error("Error al conectar a la base de datos: " + err);
    } else {
        console.log("Conexón a la base de datos establecida correctamente.");
        app.listen(serverPort, () => console.log(`Listening on port ${serverPort}...`));
    }
});


