const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    fechaHora: {
        type: Date,
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'tipos-eventos',
        required: true
    },
    partido: {
        type: Schema.Types.ObjectId,
        ref: 'partidos',
        required: true
    }
});

module.exports = mongoose.model('evento', eventoSchema, 'eventos');
