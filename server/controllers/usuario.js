const bcrypt = require('bcrypt');
const schema = require('../models/usuarios');
const { validateModel } = require('../libraries/validationModel');
const SqlString = require('sqlstring');
const _ = require('underscore');
const { InterfaceLogUser } = require('../classes/interface_Log_usuario');
const colors = require('colors/safe');
const { number } = require('@hapi/joi');

//validar nombre de la tabla y columna "password",
async function Insert(reqClient, resClient, databaseManager) {
    let Usuario = reqClient.body;
    delete Usuario.password2;
    let validationResult = validateModel(Usuario, schema.Insert);
    if (validationResult.responseStatus) {
        let requestParameters = validationResult.resultData;
        Usuario = {

        }
        console.log(requestParameters)
            // encriptar clave
            // requestParameters.password = bcrypt.hashSync(requestParameters.password, 10)
            // 


        // 
        // let sql = SqlString.format(`INSERT INTO usuarios_officina SET ?`, requestParameters);
        // console.log(sql);
        // let dbResponse = await databaseManager.executeQueries(sql);
        resClient.status(205).send('ok');
        // if (dbResponse.responseStatus) {
        //     return new InterfaceLogUser(dbResponse.resultData.insertId, 'nuevo registro', 2, databaseManager);

        // }
    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }
}
//cambie el nombre de la tabla
async function getByCorreo(reqClient, resClient, databaseManage) {
    let correo = reqClient.query.correo;
    let sql = SqlString.format(`Select * from usuarios_officina where correo = ?`, correo);
    console.log(sql);
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


async function getById(reqClient, resClient, databaseManager) {

    let id_usuario = reqClient.query.id_usuario;
    let validateResult = validateModel({ id_usuario }, schema.getById);
    if (validateResult.responseStatus) {
        let sql = SqlString.format('SELECT * FROM vista_usuario_oficina  where ?', { id_usuario });
        let dbResponse = await databaseManager.executeQueries(sql);
        let userData = dbResponse.resultData[0];
        // dbResponse.resultData = dbResponse.resultData[0];
        if (userData) {
            sql = SqlString.format('SELECT * FROM vista_dispositivos  where ?', { id_usuario });
            dbResponse = await databaseManager.executeQueries(sql);
            userData.Dispositivos = dbResponse.resultData;

            sql = SqlString.format('SELECT * FROM vista_relacion_app  where ?', { id_usuario });
            dbResponse = await databaseManager.executeQueries(sql);
            userData.Aplicaciones = dbResponse.resultData;

            dbResponse.resultData = userData;
        } else {
            dbResponse.resultData = 'EL USUARIO NO SE ENCUENTRA EN BASE DATOS'
        }
        return resClient.status(dbResponse.responseCode).send(dbResponse);

    } else {
        resClient.status(validateResult.responseCode).send(
            validateResult
        )
    }



}


// luis

async function usuarioOficina(reqClient, resClient, databaseManager) {

    let id_usuario = reqClient.query.id_usuario;
    let validationResult = validateModel({ id_usuario }, schema.usuarioOficina);
    if (validationResult.responseStatus) {
        let sql = SqlString.format('SELECT * from vista_usuario_oficina where id_usuario = ?', id_usuario);
        let dbResponse = await databaseManager.executeQueries(sql);

        resClient.send(dbResponse);
    } else {
        resClient.send(validationResult);
    }
}

// luis
async function getTecnicoSistemaByid(reqClient, resClient, databaseManager) {

    let id_tecnico = reqClient.query.id_tecnico;
    let validationResult = validateModel({ id_tecnico }, schema.tecnicoSistema);
    if (validationResult.responseStatus) {
        let sql = SqlString.format('SELECT * from vista_tecnico where id_tecnico = ?', id_tecnico);

        let dbResponse = await databaseManager.executeQueries(sql);

        resClient.send(dbResponse);


    } else {
        resClient.send(validationResult);
    }
}
//luis
async function getList(reqClient, resClient, databaseManager) {
    //ASIGNAMOS VALORES  DE LA PETICION A LA VARIABLE "parameters" (ojo en este caso viene en QUERY )
    let parameters = {
        posicion: Number(reqClient.query.posicion),
        cantiRegistro: Number(reqClient.query.cantiRegistro)
    }
    let validationResult = validateModel(parameters, schema.getList);
    if (validationResult.responseStatus == true) {

        let totalData = parameters.cantiRegistro
        let dbResponse = await databaseManager.executeQueries('SELECT COUNT(*) AS totalRecords from vista_usuario_oficina ');
        let totalRecords = dbResponse.resultData[0].totalRecords;
        let totalPage = Math.floor(totalRecords / parameters.cantiRegistro);
        let sql = SqlString.format('SELECT * FROM vista_usuario_oficina order by id_usuario LIMIT ?,?', [parameters.posicion, parameters.cantiRegistro]);
        // hace una peticion  a la base de datos;
        console.log(sql);
        dbResponse = await databaseManager.executeQueries(sql);
        let data = dbResponse.resultData;
        dbResponse.resultData = {
            totalRecords,
            totalPage,
            totalData,
            posicion: parameters.posicion,
            data: data
        }
        resClient.status(dbResponse.responseCode).send(dbResponse);
    } else {
        resClient.status(validationResult.responseCode).send(validationResult);
    }
}
//luis
async function update(req, res, databaseManage) {
    let parameters = {
        attribute: req.body.attribute,
        value: req.body.value,
        id_usuario: req.body.id_usuario
    }
    let validationResult = validateModel(parameters, schema.update);
    if (validationResult.responseStatus == true) {

        let sql = SqlString.format(`UPDATE usuarios_officina SET  ${parameters.attribute} = ? WHERE id = ?`, [parameters.value, parameters.id_usuario]);
        let dbResponse = await databaseManage.executeQueries(sql);
        res.status(dbResponse.responseCode).send(dbResponse)
    } else {
        res.status(validationResult.responseCode).send(validationResult);

    }

}


async function rolGetList(reqClient, resClient, databaseManage) {

    let sql = SqlString.format('SELECT *  FROM rol');
    let dbResponse = await databaseManage.executeQueries(sql);
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });

}
//en proceso
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

        let dbResponse = await databaseManager.executeQueries(`SELECT COUNT(*) AS totalRecords from vista_usuario_oficina  WHERE nombre LIKE ${search} OR correo LIKE ${search} OR cargo LIKE ${search} or cedula LIKE ${search}`);


        let totalRecords = dbResponse.resultData[0].totalRecords;
        let totalPage = Math.floor(totalRecords / parameters.cantiRegistro);

        let sql = SqlString.format(`SELECT * FROM vista_usuario_oficina WHERE nombre LIKE ${search} OR correo LIKE ${search} OR cargo LIKE ${search} or cedula LIKE ${search}  ORDER by id_usuario 	LIMIT ?,?`, [parameters.posicion, parameters.cantiRegistro]);
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

module.exports = {
    Insert,
    getByCorreo,
    oficinaGetList,
    grupoGetList,
    usuarioOficina,
    getTecnicoSistemaByid,
    getList,
    update,
    rolGetList,
    getById,
    searchList
}