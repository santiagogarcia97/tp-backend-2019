const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estadioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    }
});

module.exports = mongoose.model('estadio', estadioSchema, 'estadios');
