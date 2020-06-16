const Joi = require('@hapi/joi');


function validateModel(entity, schema) {
    let resultValidation = schema.validate(entity, { allowUnknown: true });

    if (resultValidation.error != null) {
        return {
            responseCode: 400,
            responseStatus: false,
            responseMessage: "REQUEST_FORBIDDEN",
            resultData: resultValidation.error.details[0].message
        };
    }
    return {
        responseCode: 200,
        responseStatus: true,
        responseMessage: "ok",
        resultData: resultValidation.value
    }

};

module.exports = {
    validateModel
}