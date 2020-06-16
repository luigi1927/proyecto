const bcrypt = require('bcrypt');
const schema = require('../models/usuarios');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');
const _ = require('underscore');
const { InterfaceLogUser } = require('../classes/interface_Log_usuario');


async function Insert(reqClient, resClient, databaseManager) {

    let Usuario = reqClient.body;
    delete Usuario.password2;
    let validationResult = validateModel(Usuario, schema.Insert);
    if (validationResult.responseStatus) {
        let requestParameters = validationResult.resultData;
        requestParameters.password = bcrypt.hashSync(requestParameters.password, 10)
        let sql = SqlString.format(`INSERT INTO usuarios SET ?`, requestParameters);
        let dbResponse = await databaseManager.executeQueries(sql);
        resClient.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            return new InterfaceLogUser(dbResponse.resultData.insertId, 'nuevo registro', 2, databaseManager);

        }
    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }
}

async function getByCorreo(reqClient, resClient, databaseManage) {
    let correo = reqClient.query.correo;
    let sql = SqlString.format(`Select * from usuarios where correo = ?`, correo);
    let dbResponse = await databaseManage.executeQueries(sql);
    if (_.isEmpty(dbResponse.resultData)) {
        return resClient.status(200).json({
            responseCode: 200,
            responseStatus: true,
            responseMessage: "No existe el correo",
            resultData: null
        });
    } else {
        return resClient.status(200).json({
            responseCode: 200,
            responseStatus: true,
            responseMessage: "Existe el Usuario",
            resultData: true
        });
    }
}


async function oficinaGetList(reqClient, resClient, databaseManage) {

    let sql = SqlString.format('SELECT *  FROM oficina');
    let dbResponse = await databaseManage.executeQueries(sql);
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });

}
async function grupoGetList(reqClient, resClient, databaseManage) {

    let sql = SqlString.format('SELECT *  FROM grupo');
    let dbResponse = await databaseManage.executeQueries(sql);
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });

}
module.exports = {
    Insert,
    getByCorreo,
    oficinaGetList,
    grupoGetList
}