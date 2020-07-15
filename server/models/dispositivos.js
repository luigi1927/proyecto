const Joi = require('@hapi/joi');

const getByUsers = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const updateDispositivo = Joi.object().keys({
    id: Joi.number().required(),
    id_usuario: Joi.number().allow(null).required()
});


const getList = Joi.object().keys({
    posicion: Joi.number().required(),
    cantiRegistro: Joi.number().required(),
    disponible: Joi.boolean().required()
});




module.exports = {
    getByUsers,
    updateDispositivo,
    getList
}