const schema = require('../models/dispositivos');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');




async function getTipo(req, res, databaseManager) {

    let sql = SqlString.format('SELECT *  FROM tipo_dispositivo');
    let dbResponse = await databaseManager.executeQueries(sql);
    res.status(dbResponse.responseCode).send(dbResponse);

}

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
// luis
async function updateDispositivo(req, res, databaseManage) {
    let parameters = {
        id: req.body.id,
        id_usuario: req.body.id_usuario
    }

    let validationResult = validateModel(parameters, schema.updateDispositivo);
    if (validationResult.responseStatus == true) {

        let sql = SqlString.format('UPDATE dispositivos SET id_usuario = ? WHERE id = ?', [parameters.id_usuario, parameters.id]);

        let dbResponse = await databaseManage.executeQueries(sql);
        res.status(dbResponse.responseCode).send(dbResponse)
    } else {
        res.status(validationResult.responseCode).send(validationResult)
    }

}

async function getList(req, res, databaseManager) {

    let parameters = {
        posicion: Number(req.query.posicion),
        cantiRegistro: Number(req.query.cantiRegistro),
        id_tipo_dispositivo: Number(req.query.id_tipo_dispositivo),
        disponible: (req.query.disponible == 'true')
    }
    let validationResult = validateModel(parameters, schema.getList);
    console.log(parameters.disponible);



    if (validationResult.responseStatus == true) {
        let sqlCountTotal = '';
        let sql;
        if (parameters.disponible) {
            let strignIdTipo = (parameters.id_tipo_dispositivo) ? `id_tipo_dispositivo = ${parameters.id_tipo_dispositivo} and` : '';
            sqlCountTotal = `SELECT COUNT(*) AS totalRecords FROM vista_dispositivos WHERE  ${strignIdTipo} id_usuario is null `;
            sql = SqlString.format(`SELECT * FROM vista_dispositivos WHERE ${strignIdTipo} id_usuario is null   order by id_usuario LIMIT ?,?`, [parameters.posicion, parameters.cantiRegistro]);
        } else {
            let strignIdTipo = (parameters.id_tipo_dispositivo) ? `where id_tipo_dispositivo = ${parameters.id_tipo_dispositivo} ` : '';
            sqlCountTotal = `SELECT COUNT(*) AS totalRecords FROM vista_dispositivos  ${strignIdTipo}`;
            sql = SqlString.format(`SELECT * FROM vista_dispositivos  ${strignIdTipo} order by id_usuario LIMIT ?,?`, [parameters.posicion, parameters.cantiRegistro]);

        }
        console.log(sqlCountTotal);
        console.log(sql);
        let totalData = parameters.cantiRegistro;
        let dbResponse = await databaseManager.executeQueries(sqlCountTotal);
        console.log(dbResponse);
        let totalRecords = dbResponse.resultData[0].totalRecords;

        // console.log(colors.blue(totalRecords));
        let totalPage = Math.floor(totalRecords / parameters.cantiRegistro);

        dbResponse = await databaseManager.executeQueries(sql);
        let data = dbResponse.resultData;
        dbResponse.resultData = {
            totalRecords,
            totalPage,
            totalData,
            posicion: parameters.posicion,
            data: data
        }
        res.status(dbResponse.responseCode).send(dbResponse);
    } else {
        res.status(validationResult.responseCode).send(validationResult);
    }
}


module.exports = {
    getByUsers,
    updateDispositivo,
    getTipo,
    getList,

}