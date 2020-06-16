const Joi = require('@hapi/joi');

const getByUsers = Joi.object().keys({
    id_usuario: Joi.number().required()
});



module.exports = {
    getByUsers
}