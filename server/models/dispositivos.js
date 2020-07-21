const Joi = require('@hapi/joi');

const getByUsers = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const updateDispositivo = Joi.object().keys({
    id: Joi.number().required(),
    id_usuario: Joi.number().allow(null).required(),
    id_tecnico: Joi.number().required()
});


const getList = Joi.object().keys({
    posicion: Joi.number().required(),
    cantiRegistro: Joi.number().required(),
    disponible: Joi.boolean().required()
});

const searchList = Joi.object().keys({
    posicion: Joi.number().required(),
    cantiRegistro: Joi.number().required(),
    parameter: Joi.string().required()
});




module.exports = {
    getByUsers,
    updateDispositivo,
    getList,
    searchList
}