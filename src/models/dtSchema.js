const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dtSchema = new Schema({
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
    ref: 'equipos',
    default: null
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

dtSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    nombre:  Joi.string().min(3).max(30).required(),
    fechaNac: Joi.date().max(Date()),
    equipo: Joi.string().regex(/^[a-fA-F0-9]{24}$/)
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('dt', dtSchema, 'dts');
