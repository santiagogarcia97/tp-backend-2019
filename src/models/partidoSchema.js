const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidoSchema = new Schema({
  fechaHora: {
    type: Date,
    required: true
  },
  local: {
    type: Schema.Types.ObjectId,
    ref: 'equipo',
    required: true
  },
  visitante: {
    type: Schema.Types.ObjectId,
    ref: 'equipo',
    required: true
  },
  eventos: [{
    type: Schema.Types.ObjectId,
    ref: 'evento'
  }],
  estadio: {
    type: Schema.Types.ObjectId,
    ref: 'estadio',
    required: true
  },
  finalizado: {
    type: Boolean,
    default: false
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

partidoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    fechaHora:  Joi.date().required(),
    local: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    visitante: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    eventos: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)),
    estadio: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('partido', partidoSchema, 'partidos');
