const Joi = require('joi');

module.exports.encodeUrl = Joi.object().keys({
  longUrl: Joi.string().uri().required(),
  description: Joi.string().optional(),
});
