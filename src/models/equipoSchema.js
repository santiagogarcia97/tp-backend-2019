const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  jugadores: [{
    type: Schema.Types.ObjectId,
    ref: 'jugadores'
  }],
  dt: {
    type: Schema.Types.ObjectId,
    ref: 'dts'
  },
  escudo: {
    type: String,
    default: null
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

equipoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    nombre:  Joi.string().min(3).max(30).required(),
    jugadores: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
    dt: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    escudo: Joi.string()
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('equipo', equipoSchema, 'equipos');
