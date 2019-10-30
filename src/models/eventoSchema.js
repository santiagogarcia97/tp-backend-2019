const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  partido: {
    type: Schema.Types.ObjectId,
    ref: 'partidos',
    required: true
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'tipos-eventos',
    required: true
  },
  equipo: {
    type: Schema.Types.ObjectId,
    ref: 'equipos',
    required: true
  },
  jugador: {
    type: Schema.Types.ObjectId,
    ref: 'jugadores',
    required: true
  },
  fechaHora: {
    type: Date,
    required: true,
    default: Date.now()
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

eventoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    partido:  Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    tipo: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    equipo: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    jugador:Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    fechaHora: Joi.date().max(Date()),
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('evento', eventoSchema, 'eventos');
