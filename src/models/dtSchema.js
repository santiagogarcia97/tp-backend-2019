const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dtSchema = new Schema({
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
    }
});

module.exports = mongoose.model('dt', dtSchema, 'dts');
