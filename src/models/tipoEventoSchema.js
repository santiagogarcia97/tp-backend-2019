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
    },
  eliminado: {
    type: Boolean,
    default: false
  }
});

tipoEventoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    desc:  Joi.string().max(30).required(),
    icono:  Joi.string().required()
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('tipoEvento', tipoEventoSchema, 'tipos-eventos');
