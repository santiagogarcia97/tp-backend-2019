const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jugadorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaNac: {
        type: Date
    },
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'equipos'
    },
    goles: {
        type: Number
    }
});

module.exports = mongoose.model('jugador', jugadorSchema, 'jugadores');
