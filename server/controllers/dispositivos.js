const schema = require('../models/dispositivos');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');



async function getByUsers(reqClient, resClient, databaseManager) {
    let id_usuario = reqClient.query.id_usuario;
    let validationResult = validateModel({ id_usuario }, schema.getByUsers);

    if (validationResult.responseStatus) {
        let sql = SqlString.format('SELECT * FROM `vista_dispositivos` where id_usuario = ?', id_usuario);

        let dbResponse = await databaseManager.executeQueries(sql);
        resClient.status(dbResponse.responseCode).send({
            ...dbResponse
        });
    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }
}



module.exports = {
    getByUsers
}