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
    }
});

tipoEventoSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    desc:  Joi.string().max(30).required(),
    icono:  Joi.string().max(100).required()
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('tipoEvento', tipoEventoSchema, 'tipos-eventos');
