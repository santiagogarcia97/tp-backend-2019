const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  partido: {
    type: Schema.Types.ObjectId,
    ref: 'partido',
    required: true
  },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'tipoEvento',
    required: true
  },
  equipo: {
    type: Schema.Types.ObjectId,
    ref: 'equipo'
  },
  jugador: {
    type: Schema.Types.ObjectId,
    ref: 'jugador'
  },
  minutoOcurrencia: {
    type: Number,
    required: true
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

eventoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    partido:  Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    tipo: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    equipo: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    jugador:Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    minutoOcurrencia: Joi.number().integer().min(0).max(150).required()
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('evento', eventoSchema, 'eventos');
