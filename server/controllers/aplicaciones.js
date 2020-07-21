const schema = require('../models/aplicaciones');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');
const { InterfaceLogAdminUser } = require('../classes/interface_Log_usuario');
const { io } = require('../sockets/socket');


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
// agregar modificaciones
async function getApp(req, res, databaseManager) {

    let parameters = {
        parameter: (req.query.parameter)
    }
    let validationResult = validateModel(parameters, schema.getApp);
    console.log(validationResult);
    let sql = '';
    if (parameters.parameter) {
        let search = SqlString.escape('%' + parameters.parameter + '%');
        sql = SqlString.format(`SELECT * FROM vista_aplicacion WHERE aplicacion LIKE ${search} OR proveedor LIKE ${search} OR id LIKE ${search} `);
    } else {
        sql = SqlString.format('SELECT *  FROM vista_aplicacion');

    }
    let dbResponse = await databaseManager.executeQueries(sql);
    if (dbResponse.responseStatus && dbResponse.resultData.length)

        res.status(dbResponse.responseCode).send(dbResponse);
}

//en procesooo
async function InsertRelApp(req, res, databaseManager) {
    const InsertApp = req.body;
    console.log(InsertApp);
    let validationResult = validateModel(InsertApp, schema.InsertRelApp);
    if (validationResult.responseStatus) {
        const requestParameters = InsertApp;
        const id_tecnico = requestParameters.id_tecnico;
        delete requestParameters.id_tecnico;
        let sql = SqlString.format(`INSERT INTO  relacion_app_usuarios SET ?`, requestParameters);
        console.log()
        let dbResponse = await databaseManager.executeQueries(sql);
        res.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            io.emit('aplicacionagregada', {
                message: 'se agrego correctamente'
            });

            let observacion = {
                id_tecnico,
                observacion: "APLICACION AGREGADA"
            }

            observacion = JSON.stringify(observacion);
            let intAdmin = new InterfaceLogAdminUser(id_tecnico, observacion, 5);
            let funAdmin = await intAdmin.insertLogEventoTecnico();


        }

    } else {
        res.status(validationResult.responseCode).send({
            ...validationResult
        });
    }

}


async function DeleteRelapp(req, res, databaseManager) {
    let parameters = {
        id_usuario: req.body.id_usuario,
        id_tecnico: req.body.id_tecnico,
        id_aplicacion: req.body.id_aplicacion
    }
    let validationResult = validateModel(parameters, schema.DeleteRelapp);
    if (validationResult.responseStatus == true) {
        let sql = SqlString.format(`DELETE FROM relacion_app_usuarios WHERE id_usuario = ?`, parameters.id_usuario);
        let dbResponse = await databaseManager.executeQueries(sql);
        res.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            io.emit('aplicacionborrada', {
                message: 'se elimino correctamente'
            });
            let observacion = {
                id_tecnico: req.body.id_tecnico,
                observacion: "APLICACION ELIMINADA"
            }
            observacion = JSON.stringify(observacion);
            new InterfaceLogAdminUser(parameters.id_tecnico, observacion, 5).insertLogEventoTecnico();
        }

    } else {
        res.status(validationResult.responseCode).send({
            ...validationResult
        });
    }

}




module.exports = {
    getByRelationAppUsers,
    getApp,
    InsertRelApp,
    DeleteRelapp
}