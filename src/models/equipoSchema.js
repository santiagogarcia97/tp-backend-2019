const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoSchema = new Schema({
    nombre: {
        type: String
    }
});

module.exports = mongoose.model('EquipoSchema', EquipoSchema);
