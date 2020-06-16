const Joi = require('@hapi/joi');

const getByRelationAppUsers = Joi.object().keys({
    id_usuario: Joi.number().required()
});



module.exports = {
    getByRelationAppUsers
}