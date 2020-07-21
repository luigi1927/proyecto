const Joi = require('@hapi/joi');

const getByRelationAppUsers = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const getApp = Joi.object().keys({
    parameter: Joi.string().allow(null).default(1)
});

const InsertRelApp = Joi.object().keys({
    id_aplicacion: Joi.number().required(),
    id_tecnico: Joi.number().required(),
    id_usuario: Joi.number().required()
});

const DeleteRelapp = Joi.object().keys({
    id_aplicacion: Joi.number().required(),
    id_tecnico: Joi.number().required(),
    id_usuario: Joi.number().required()
});


module.exports = {
    getByRelationAppUsers,
    getApp,
    InsertRelApp,
    DeleteRelapp
}