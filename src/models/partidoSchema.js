const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidoSchema = new Schema({
    fechaHora: {
        type: Date
    },
    local: {
        type: Schema.Types.ObjectId,
        ref: 'equipos'
    },
    visitante: {
        type: Schema.Types.ObjectId,
        ref: 'equipos'
    },
    eventos: [{
        type: Schema.Types.ObjectId,
        ref: 'eventos'
    }],
    estadio: {
        type: Schema.Types.ObjectId,
        ref: 'estadios'
    }
});

module.exports = mongoose.model('partido', partidoSchema, 'partidos');
