const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

const teamRoute = require('./routes/equipos');
app.use(teamRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
