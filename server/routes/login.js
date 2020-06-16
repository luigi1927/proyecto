const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const _ = require('underscore');
const { createAuthorization } = require('../libraries/authenticationJWT');
const SqlString = require('sqlstring');
const { InterfaceLogUser, InterfaceLogAdminUser } = require('../classes/interface_Log_usuario');

app.post('/loginUsers', async(req, res) => {

    const databaseManager = app.get('databaseManager');
    let dataUser = {
        correo: req.body.correo,
    }
    let sql = SqlString.format('Select *, id as id_usuario from usuarios_officina where correo = ? and id_estado = ?', [dataUser.correo, 1]);
    let resultLogin = await databaseManager.executeQueries(sql);
    if (_.isEmpty(resultLogin.resultData)) {
        return res.status(400).json({
            responseCode: 400,
            responseStatus: false,
            responseMessage: "Usted no se encuentra registrado Consulte con el área de sistemas",
            resultData: null
        });

    }
    sql = SqlString.format('SELECT *, id as id_tecnico FROM `tecnicos_sistemas` where correo = ? and id_estado = ?', [dataUser.correo, 1]);
    let validateUser = await databaseManager.executeQueries(sql);

    if (!_.isEmpty(validateUser.resultData)) {
        return res.status(400).json({
            responseCode: 400,
            responseStatus: false,
            responseMessage: "Por favor ingrese por el área de sistemas ",
            resultData: null
        });

    }
    resultLogin = resultLogin.resultData[0];
    resultLogin.empresa = 'lopez_asociados';
    let token = createAuthorization(resultLogin);
    res.json({
        responseCode: 200,
        responseMessage: "ok",
        resultData: {
            token,
            exp: 60 * process.env.CADUCIDAD_TOKEN
        }
    });
    let interface = new InterfaceLogUser(resultLogin.id, 'INGRESO', 1);
    let response = await interface.insertLogEventoUsers();




})


app.post('/loginAdmin', async(req, res) => {

    const databaseManager = app.get('databaseManager');
    let dataUser = {
        correo: req.body.correo,
        password: req.body.password
    }
    let sql = SqlString.format('SELECT *, id as id_tecnico FROM `tecnicos_sistemas` where correo = ? and id_estado = ?', [dataUser.correo, 1]);
    let resultLogin = await databaseManager.executeQueries(sql);
    if (_.isEmpty(resultLogin.resultData)) {
        return res.status(400).json({
            responseCode: 400,
            responseStatus: false,
            responseMessage: "Correo o contraseña incorrectos",
            resultData: null
        });

    }

    resultLogin = resultLogin.resultData[0];
    if (resultLogin.id_rol !== 1) {
        return res.status(400).json({
            responseCode: 400,
            responseStatus: false,
            responseMessage: "disculpe! usted no tiene acceso por este método",
            resultData: null
        });
    }
    if (!bcrypt.compareSync(dataUser.password, resultLogin.password)) {
        return res.status(400).json({
            responseCode: 400,
            responseStatus: false,
            responseMessage: "correo o Contraseña incorrectos",
            resultData: null
        });
    }
    delete resultLogin.password;
    resultLogin.empresa = 'platinum';
    let token = createAuthorization(resultLogin);
    res.json({
        responseCode: 200,
        responseMessage: "ok",
        resultData: {
            token,
            exp: 60 * process.env.CADUCIDAD_TOKEN
        }
    });
    let interface = new InterfaceLogAdminUser(resultLogin.id, 'INGRESO', 1);
    let response = await interface.insertLogEventoTecnico();
})


module.exports = app;