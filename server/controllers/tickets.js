const schema = require('../models/tickets');
const { validateModel } = require('../libraries/validationModel');
const { annotateText } = require('../libraries/naturalLanguage');
const SqlString = require('sqlstring');
const _ = require('underscore');
const { InterfaceLogUser, InterfaceLogAdminUser } = require('../classes/interface_Log_usuario');
const { io } = require('../sockets/socket');



async function Insert(reqClient, resClient, databaseManager) {

    let Tickets = reqClient.body;
    let validationResult = validateModel(Tickets, schema.Insert);
    if (validationResult.responseStatus) {
        let requestParameters = {
                id_usuario_creador: Tickets[0].id_usuario,
                fecha_creacion: new Date(),
                id_prioridad: 1,
                estado_ticket: 1
            }
            // resClient.status(200).send({
            //     ...requestParameters
            // });
        let sql = SqlString.format(`INSERT INTO tickets SET ?`, requestParameters);
        let dbResponse = await databaseManager.executeQueries(sql);
        if (dbResponse.responseStatus) {
            let id_ticket = dbResponse.resultData.insertId;
            for (const síntoma in Tickets) {
                if (Tickets.hasOwnProperty(síntoma)) {
                    const element = Tickets[síntoma];
                    delete element.posicion;
                    delete element.foto;
                    element.tags = await annotateText(element.nombre, element.sintoma);
                    delete element.nombre;
                    element.id_ticket = id_ticket;
                    element.fecha_creacion = new Date();
                    // console.log(element.sintoma);
                    sql = SqlString.format(`INSERT INTO sintomas SET ?`, element);
                    dbResponse = await databaseManager.executeQueries(sql);
                    if (!dbResponse.responseStatus) {
                        return resClient.status(dbResponse.responseCode).send({
                            ...dbResponse
                        });
                    }
                }
            }

            if (dbResponse.responseStatus) {
                dbResponse = await databaseManager.executeQueries(`SELECT * FROM vista_tickets where id_ticket = ${id_ticket}`);
                io.emit('nuevoTicket', {
                    ...dbResponse
                });
                resClient.status(dbResponse.responseCode).send({
                    ...dbResponse
                });
                let interface = new InterfaceLogUser(Tickets[0].id_usuario, 'CREACION', 4);
                let response = await interface.insertLogEventoUsers();
            }

        } else {
            resClient.status(dbResponse.responseCode).send({
                ...dbResponse
            });
        }
    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }
}



async function getListNameTechnical(reqClient, resClient, databaseManager) {
    let dbResponse = await databaseManager.executeQueries("SELECT * FROM tecnicos_sistemas where id_estado  !=2");
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });
}

async function getList(reqClient, resClient, databaseManager) {
    let dbResponse = await databaseManager.executeQueries("SELECT * FROM vista_tickets WHERE estado != 'CERRADO'");
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });

}
async function assignTechnical(reqClient, resClient, databaseManager) {

    let ids = reqClient.body;
    let validationResult = validateModel(ids, schema.assignTechnical);
    if (validationResult.responseStatus) {
        const id_estado = (ids.id_tecnico === null) ? 1 : 2;
        let sql = SqlString.format(`UPDATE tickets SET estado_ticket = ?, id_tecnico_asignado =? WHERE  id = ?;`, [id_estado, ids.id_tecnico, ids.id_ticket]);
        let dbResponse = await databaseManager.executeQueries(sql);

        resClient.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            io.emit('asignacionTicket', {
                message: 'se asigno correctamente'
            });
        }

    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }

}
async function getByTechnical(reqClient, resClient, databaseManager) {

    let id_tecnico = reqClient.query.id_tecnico;
    let validationResult = validateModel({ id_tecnico }, schema.getByTechnical);
    if (validationResult.responseStatus) {

        let sql = SqlString.format(`SELECT * FROM vista_tickets where id_tecnico_asignado = ?`, [id_tecnico]);

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
async function getByUser(reqClient, resClient, databaseManager) {

    let id_usuario = reqClient.query.id_usuario;
    let validationResult = validateModel({ id_usuario }, schema.getByUser);
    if (validationResult.responseStatus) {

        let sql = SqlString.format(`SELECT * FROM vista_tickets where id_usuario = ?`, [id_usuario]);

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


async function getSintomas(reqClient, resClient, databaseManager) {

    let id_ticket = reqClient.query.id_ticket;
    let validationResult = validateModel({ id_ticket }, schema.getSintomas);
    if (validationResult.responseStatus) {
        let sql = SqlString.format(`SELECT * FROM vista_ticketsbyuser where id_ticket = ?`, [id_ticket]);

        let dbResponse = await databaseManager.executeQueries(sql);
        if (dbResponse.responseStatus) {
            let ticket = {...dbResponse.resultData[0] };
            sql = SqlString.format(`SELECT * FROM vista_sintomas_by_ticket where id_ticket = ?`, [id_ticket]);
            dbResponse = await databaseManager.executeQueries(sql);
            ticket.sintomas = dbResponse.resultData;
            if (dbResponse.resultData && dbResponse.resultData.length > 0) {
                for (const key in dbResponse.resultData) {
                    if (dbResponse.resultData.hasOwnProperty(key)) {

                        const element = dbResponse.resultData[key];
                        if (element.aplicacion !== null)
                            element.foto = element.aplicacion.replace(' ', '_') + '.jpg';
                        if (element.tags !== null) {
                            element.tags = element.tags.split(',');
                        }
                    }
                }
            }
            dbResponse.resultData = ticket;
            resClient.status(dbResponse.responseCode).send({
                ...dbResponse
            });
        } else {
            resClient.status(dbResponse.responseCode).send({
                ...dbResponse
            });
        }

    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }

}



async function getComentariosTecnicosByTicket(reqClient, resClient, databaseManager) {

    let id_ticket = reqClient.query.id_ticket;
    let validationResult = validateModel({ id_ticket }, schema.getSintomas);
    if (validationResult.responseStatus) {

        let sql = SqlString.format(`SELECT * FROM vista_comentarios_tecnicos_ticket  where id_ticket = ?`, [id_ticket]);

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

async function getTipoComentarioTecnico(reqClient, resClient, databaseManager) {
    let dbResponse = await databaseManager.executeQueries('SELECT * FROM tipos_comentarios_tecnico');
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });
}


async function InsertComentarioTecnico(reqClient, resClient, databaseManager) {

    let objectComentario = reqClient.body;
    let validationResult = validateModel(objectComentario, schema.InsertComentarioTecnico);
    if (validationResult.responseStatus) {
        let requestParameters = objectComentario;
        requestParameters.fecha_creacion = new Date();
        let sql = SqlString.format(`INSERT INTO comentarios_tecnicos SET ?`, requestParameters);
        let dbResponse = await databaseManager.executeQueries(sql);
        resClient.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            io.emit('nuevoComentarioTecnico', {
                message: 'ok'
            });
        }

    } else {

        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }


}
async function getCatalogoPrueba(reqClient, resClient, databaseManager) {
    console.log('enntro');
    let dbResponse = await databaseManager.executeQueries(`SELECT * FROM catalogo_pruebas`);
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });

}


async function getTipificacionPrueba(reqClient, resClient, databaseManager) {
    let dbResponse = await databaseManager.executeQueries(`SELECT * FROM  tipificacion_prueba`);
    resClient.status(dbResponse.responseCode).send({
        ...dbResponse
    });

}


async function InsertPruebaEjecutada(reqClient, resClient, databaseManager) {

    let pruebaEjecutada = reqClient.body;
    let validationResult = validateModel(pruebaEjecutada, schema.InsertPruebaEjecutada);
    if (validationResult.responseStatus) {
        let requestParameters = pruebaEjecutada;
        requestParameters.fecha_creacion = new Date();
        let sql = SqlString.format(`INSERT INTO pruebas_ejecutadas SET ?`, requestParameters);
        let dbResponse = await databaseManager.executeQueries(sql);
        resClient.status(dbResponse.responseCode).send({
            ...dbResponse
        });
        if (dbResponse.responseStatus) {
            io.emit('nuevaPruebaEjecutada', {
                message: 'ok'
            });

            let interface = new InterfaceLogAdminUser(requestParameters.id_tecnico, 'PRUEBA EJECUTADA', 4);
            let response = await interface.insertLogEventoTecnico();

        }

    } else {

        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }


}

async function getPruebaEjecutadaBySintoma(reqClient, resClient, databaseManager) {
    let id_sintoma = reqClient.query.id_sintoma;
    console.log(id_sintoma);
    let validationResult = validateModel({ id_sintoma }, schema.GetPruebaEjecutadaBySintoma);
    if (validationResult.responseStatus) {

        let sql = SqlString.format(`SELECT * FROM vista_prueba_ejecutadabysintoma  where id_sintoma = ?`, [id_sintoma]);

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
    Insert,
    getList,
    assignTechnical,
    getByTechnical,
    getListNameTechnical,
    getByUser,
    getSintomas,
    getComentariosTecnicosByTicket,
    getTipoComentarioTecnico,
    InsertComentarioTecnico,
    getCatalogoPrueba,
    getTipificacionPrueba,
    InsertPruebaEjecutada,
    getPruebaEjecutadaBySintoma
}