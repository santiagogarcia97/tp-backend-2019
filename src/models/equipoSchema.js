const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipoSchema = new Schema({
    nombre: {type: String, required: true, unique: true},
    escudo: {type: String}
});

module.exports = mongoose.model('equipo', equipoSchema);
