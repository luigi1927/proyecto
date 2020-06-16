const Joi = require('@hapi/joi');



const Insert = Joi.object().keys({
    cedula: Joi.number().required(),
    nombre: Joi.string().required(),
    cargo: Joi.string().required(),
    correo: Joi.string().email().required(),
    id_grupo: Joi.number().required(),
    id_oficina: Joi.number().required(),
    password: Joi.string().required(),
    reset_password: Joi.boolean().default(false),
    extension: Joi.number().required(),
    id_estado: Joi.number().default(1),
    id_rol: Joi.number().default(2)
});




module.exports = {
    Insert
}