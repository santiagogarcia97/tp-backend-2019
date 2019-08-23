const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    jugadores: [{
        type: Schema.Types.ObjectId,
        ref: 'jugadores'
    }],
    dt: [{
        type: Schema.Types.ObjectId,
        ref: 'dts'
    }],
    escudo: {
        type: String
    }
});

module.exports = mongoose.model('equipo', equipoSchema, 'equipos');
