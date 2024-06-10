const Joi = require("joi");

const userSchema = Joi.object({
  idSql: Joi.number().required(),
  nombre: Joi.string().required(),
  URLFoto: Joi.string().required(),
  descripcion: Joi.string().required(),
  estado: Joi.boolean().default(true),
  correo: Joi.string().required(),
  passwordHash: Joi.string().required(),
  artistasSeguidos: Joi.array().items(Joi.string()),
  usuariosSeguidos: Joi.array().items(Joi.string()),
});
module.exports = userSchema;
