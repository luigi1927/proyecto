const schema = require('../models/dispositivos');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');
const { InterfaceLogUser, InterfaceLogAdminUser } = require('../classes/interface_Log_usuario');
const { io } = require('../sockets/socket');



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
// actualiza dispositivos evento LOG 
async function updateDispositivo(req, res, databaseManager) {
    let parameters = {
        id: req.body.id,
        id_usuario: req.body.id_usuario,
        id_tecnico: req.body.id_tecnico
    }
    let validationResult = validateModel(parameters, schema.updateDispositivo);
    if (validationResult.responseStatus == true) {
        let sql = SqlString.format('UPDATE dispositivos SET id_usuario = ? WHERE id = ?', [parameters.id_usuario, parameters.id]);
        let dbResponse = await databaseManager.executeQueries(sql);
        res.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            io.emit('dispositivoactualizado', {
                message: 'se actualizo correctamente'
            });
            let observacion = {
                id_tecnico: req.body.id_tecnico,
                observacion: "DISPOSITIVO ACTUALIZADO"
            }
            observacion = JSON.stringify(observacion);
            new InterfaceLogAdminUser(parameters.id_tecnico, observacion, 4).insertLogEventoTecnico();
        }

    } else {
        res.status(validationResult.responseCode).send({
            ...validationResult
        });
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
        let totalData = parameters.cantiRegistro;
        let dbResponse = await databaseManager.executeQueries(sqlCountTotal);
        console.log(dbResponse);
        let totalRecords = dbResponse.resultData[0].totalRecords;
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
//luis
// busca por usuario,placa u origen del dispositivo , y los organiza en una lista 
async function searchList(req, res, databaseManager) {

    let parameters = {
        posicion: Number(req.query.posicion),
        cantiRegistro: Number(req.query.cantiRegistro),
        parameter: String(req.query.parameter)
    }
    let validationResult = validateModel(parameters, schema.searchList);
    if (validationResult.responseStatus == true) {
        let totalData = parameters.cantiRegistro;
        let search = SqlString.escape('%' + parameters.parameter + '%');
        let dbResponse = await databaseManager.executeQueries(`SELECT COUNT(*) AS totalRecords from vista_dispositivos  WHERE usuario LIKE ${search} OR placa LIKE ${search} OR origen LIKE ${search}`);
        let totalRecords = dbResponse.resultData[0].totalRecords;
        let totalPage = Math.floor(totalRecords / parameters.cantiRegistro);
        let sql = SqlString.format(`SELECT * FROM vista_dispositivos WHERE usuario LIKE ${search} OR placa LIKE ${search} OR origen LIKE ${search}  ORDER by id_usuario LIMIT ?,?`, [parameters.posicion, parameters.cantiRegistro]);
        dbResponse = await databaseManager.executeQueries(sql);
        let data = dbResponse.resultData;
        console.log(sql);
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
// luis
// busca por referencia , modelo,marca, o por id_referencia
async function searchRef(req, res, databaseManager) {

    let parameters = {
        parameter: String(req.query.parameter),
        id_referencia: req.query.id_referencia
    }
    let validationResult = validateModel(parameters, schema.searchRef);
    if (parameters.parameter) {
        let search = SqlString.escape('%' + parameters.parameter + '%');
        let sql = SqlString.format(`SELECT * FROM vista_referencia_modelo_marca WHERE referencia LIKE ${search} OR modelo LIKE ${search} OR marca LIKE ${search} OR id_referencia = ? `, [parameters.id_referencia]);
        dbResponse = await databaseManager.executeQueries(sql);
        let data = dbResponse.resultData;
        dbResponse.resultData = {
            data: data
        }
        res.status(dbResponse.responseCode).send(dbResponse);
    } else {
        res.status(validationResult.responseCode).send(validationResult);
    }

}
//luis
// busca origen del dispositivo.
async function getOrigen(req, res, databaseManager) {

    let sql = SqlString.format('SELECT *  FROM origen_dispositivo');
    let dbResponse = await databaseManager.executeQueries(sql);
    res.status(dbResponse.responseCode).send(dbResponse);

}


async function InsertDisp(req, res, databaseManager) {
    let InsertDis = req.body;
    let validationResult = validateModel(InsertDis, schema.InsertDisp);
    if (validationResult.responseStatus) {
        let sql = SqlString.format('INSERT INTO dispositivos SET ?', InsertDis);
        dbResponse = await databaseManager.executeQueries(sql);
        //res.status(dbResponse.responseCode).send({...dbResponse });
        validationResult = validateModel(InsertDis, schema.InsertInfo);

        console.log(validationResult);
    }
    if (validationResult.resultData.id_tipo_dispositivo = 1, 2, 3) {
        let dataAdd = req.body;
        sql = SqlString.format('INSERT INTO informacion_dispositivos SET ?', dataAdd);
        console.log(sql);
        let dbResponse = await databaseManager.executeQueries(sql);


        res.status(dbResponse.responseCode).send({...dbResponse });


    } else {
        resClient.send(validationResult);
    }
}



module.exports = {
    getByUsers,
    updateDispositivo,
    getTipo,
    getList,
    searchList,
    searchRef,
    getOrigen,
    InsertDisp


}