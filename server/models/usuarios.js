const { allow } = require('@hapi/joi');
const Joi = require('@hapi/joi');
//const allow = require('allow');


const Insert = Joi.object().keys({
    cedula: Joi.number().required(),
    nombre: Joi.string().required(),
    cargo: Joi.string().required(),
    correo: Joi.string().email().required(),
    id_grupo: Joi.number().required(),
    id_oficina: Joi.number().required(),
    // password: Joi.string(),
    // reset_password: Joi.boolean().default(false),
    extension: Joi.number().required(),
    id_estado: Joi.number().default(1),
    id_rol: Joi.number().default(2)
});

const usuarioOficina = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const tecnicoSistema = Joi.object().keys({
    id_tecnico: Joi.number().required()
});

// AUTHOR: LUIS VERA
// modelo de la ruta /usuario/getList para la vista 'vista_usuario_oficina'
const getList = Joi.object().keys({
    posicion: Joi.number().required(),
    cantiRegistro: Joi.number().required()
});

const update = Joi.object().keys({
    attribute: Joi.string().required().allow("cedula", "nombre", "correo", "cargo", "id_grupo", "id_oficina", "extension", "id_rol", "id_estado"),
    value: Joi.any().required().allow(null),
    id_usuario: Joi.number().required(),
    id_tecnico: Joi.number().required()
});



const getById = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const searchList = Joi.object().keys({
    posicion: Joi.number().required(),
    cantiRegistro: Joi.number().required(),
    parameter: Joi.string().required()
});



module.exports = {
    Insert,
    usuarioOficina,
    tecnicoSistema,
    getList,
    update,
    getById,
    searchList
}