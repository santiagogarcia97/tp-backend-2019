const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoEventoSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    icono: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tipoEvento', tipoEventoSchema, 'tipos-eventos');
