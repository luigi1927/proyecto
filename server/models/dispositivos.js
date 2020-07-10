const Joi = require('@hapi/joi');

const getByUsers = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const updateDispositivo = Joi.object().keys({
    id: Joi.number().required(),
    id_usuario: Joi.number().allow(null).required()
});


module.exports = {
    getByUsers,
    updateDispositivo
}