const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidoSchema = new Schema({
  fechaHora: {
    type: Date,
    required: true
  },
  local: {
    type: Schema.Types.ObjectId,
    ref: 'equipos',
    required: true
  },
  visitante: {
    type: Schema.Types.ObjectId,
    ref: 'equipos',
    required: true
  },
  eventos: [{
    type: Schema.Types.ObjectId,
    ref: 'eventos'
  }],
  estadio: {
    type: Schema.Types.ObjectId,
    ref: 'estadios',
    required: true
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

partidoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    fechaHora:  Joi.date(),
    local: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    visitante: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    eventos: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
    estadio: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('partido', partidoSchema, 'partidos');
