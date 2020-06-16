const schema = require('../models/aplicaciones');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');



async function getByRelationAppUsers(reqClient, resClient, databaseManager) {
    let id_usuario = reqClient.query.id_usuario;

    let validationResult = validateModel({ id_usuario }, schema.getByRelationAppUsers);
    if (validationResult.responseStatus) {
        let sql = SqlString.format('SELECT * FROM `vista_relacion_app` where id_usuario = ?', id_usuario);
        let dbResponse = await databaseManager.executeQueries(sql);
        if (dbResponse.resultData && dbResponse.resultData.length > 0) {
            for (const key in dbResponse.resultData) {
                if (dbResponse.resultData.hasOwnProperty(key)) {
                    const element = dbResponse.resultData[key];
                    element.foto = element.aplicacion.replace(' ', '_') + '.jpg';
                }
            }
        }
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
    getByRelationAppUsers
}