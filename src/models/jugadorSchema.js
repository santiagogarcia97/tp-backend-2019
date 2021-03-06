const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jugadorSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaNac: {
    type: Date,
    default: Date()
  },
  equipo: {
    type: Schema.Types.ObjectId,
    ref: 'equipo',
    default: null
  },
  goles: {
    type: Number,
    default: 0
  },
  amarillas: {
    type: Number,
    default: 0
  },
  rojas: {
    type: Number,
    default: 0
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

jugadorSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    nombre:  Joi.string().min(3).max(30).required(),
    fechaNac: Joi.date().max(Date()),
    equipo: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    goles: Joi.number().integer().min(0),
    amarillas: Joi.number().integer().min(0),
    rojas: Joi.number().integer().min(0)
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('jugador', jugadorSchema, 'jugadores');
