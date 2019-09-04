const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jugadorSchema = new Schema({
    fechaNac: {
        type: Date,
        default: Date()
    },
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'equipos',
        default: null
    },
    goles: {
        type: Number,
        default: 0
    },
    nombre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('jugador', jugadorSchema, 'jugadores');
