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
async function getCatalogoDiagnostico(reqClient, resClient, databaseManager) {

    let dbResponse = await databaseManager.executeQueries("SELECT * FROM catalogo_diagnostico");

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
async function updateTagsBySintoma(reqClient, resClient, databaseManager) {
    let updateTagsBySintoma = reqClient.body
    let validationResult = validateModel(updateTagsBySintoma, schema.updateTagsBySintoma);
    if (validationResult.responseStatus) {
        let { id_sintoma, tags } = updateTagsBySintoma;

        tags = (tags != null) ? tags.toString() : null;
        let sql = SqlString.format(`UPDATE  sintomas  set tags =? where id =?`, [tags, id_sintoma]);

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

async function InsertDiagnostico(reqClient, resClient, databaseManager) {
    let newDiagnostico = reqClient.body;
    let validationResult = validateModel(newDiagnostico, schema.InsertDiagnostico);
    if (validationResult.responseStatus) {
        newDiagnostico.ids_pruebas_ejecutadas = newDiagnostico.ids_pruebas_ejecutadas.toString();
        newDiagnostico.ids_catalogo_diagnostico = newDiagnostico.ids_catalogo_diagnostico.toString();
        let sql = SqlString.format(`INSERT INTO diagnostico SET ?`, newDiagnostico);
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

async function getDiagnosticoByTicket(reqClient, resClient, databaseManager) {

    let id_ticket = reqClient.query.id_ticket;
    let validationResult = validateModel({ id_ticket }, schema.getDiagnosticoByTicket);
    if (validationResult.responseStatus) {
        let sql = SqlString.format(`SELECT d.*, t.nombre as tecnico  FROM diagnostico d inner JOIN tecnicos_sistemas t on t.id = d.id_tecnico where id_ticket = ?`, [id_ticket]);

        let dbResponse = await databaseManager.executeQueries(sql);
        if (dbResponse.resultData.length > 0) {
            let ticket = dbResponse.resultData;
            for (const iterator of ticket) {

                iterator.pruebasVinculdas = iterator.ids_pruebas_ejecutadas.split(',');
                for (const key in iterator.pruebasVinculdas) {
                    if (iterator.pruebasVinculdas.hasOwnProperty(key)) {
                        const element = iterator.pruebasVinculdas[key];
                        sql = SqlString.format(`SELECT * FROM vista_prueba_ejecutadabysintoma  where id_prueba = ?`, [element]);
                        let dbResponseOther = await databaseManager.executeQueries(sql);

                        iterator.pruebasVinculdas[key] = {...dbResponseOther.resultData[0] };
                    }
                }

                if (iterator.ids_catalogo_diagnostico) {

                    iterator.ids_catalogo_diagnostico = iterator.ids_catalogo_diagnostico.split(',');
                    for (const key in iterator.ids_catalogo_diagnostico) {
                        if (iterator.ids_catalogo_diagnostico.hasOwnProperty(key)) {
                            const element = iterator.ids_catalogo_diagnostico[key];
                            sql = SqlString.format(`SELECT * FROM catalogo_diagnostico  where id = ?`, [element]);
                            dbResponseOther = await databaseManager.executeQueries(sql);

                            iterator.ids_catalogo_diagnostico[key] = {...dbResponseOther.resultData[0] };
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


async function searchCatalogoSoliciones(reqClient, resClient, databaseManager) {
    let parameter = reqClient.query.parameter;
    let validationResult = validateModel({ parameter }, schema.searchCatalogoSoliciones);
    if (validationResult.responseStatus) {

        let sql = SqlString.format(`SELECT * FROM catalogo_soluciones WHERE  solucion like "%${parameter}%"`);
        console.log(sql);
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

async function InsertSolucionEjecutada(reqClient, resClient, databaseManager) {
    let newSolucionEjecutada = reqClient.body;

    let validationResult = validateModel(newSolucionEjecutada, schema.InsertSolucionEjecutada);
    if (validationResult.responseStatus) {
        let requestParameters = newSolucionEjecutada;
        requestParameters.ids_diagnostico = requestParameters.ids_diagnostico.toString();
        requestParameters.fecha_creacion = new Date();
        let sql = SqlString.format(`INSERT INTO solucion_ejecutada SET ?`, newSolucionEjecutada);
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


async function getSolucionesEjecutadasByTickets(reqClient, resClient, databaseManager) {

    let id_ticket = Number(reqClient.query.id_ticket);
    let validationResult = validateModel({ id_ticket }, schema.getDiagnosticoByTicket);

    if (validationResult.responseStatus) {
        let sql = SqlString.format(`SELECT s.*, c.solucion, t.nombre as tecnico FROM solucion_ejecutada s  INNER JOIN catalogo_soluciones c on c.id = s.id_catalogo_solucion INNER JOIN tecnicos_sistemas t on t.id = s.id_tecnico where  ? ORDER BY s.fecha_creacion DESC`, { id_ticket });
        let dbResponse = await databaseManager.executeQueries(sql);
        if (dbResponse.resultData.length > 0) {
            let solucionesEjecutadas = dbResponse.resultData;
            for (const iterator of solucionesEjecutadas) {
                iterator.resultado = (iterator.resultado == 0) ? false : true;
                iterator.diagnosticosVinculados = iterator.ids_diagnostico.split(',');
                for (const key in iterator.diagnosticosVinculados) {
                    if (iterator.diagnosticosVinculados.hasOwnProperty(key)) {
                        const element = iterator.diagnosticosVinculados[key];
                        sql = SqlString.format(`SELECT d.*, t.nombre as tecnico  FROM diagnostico d inner JOIN tecnicos_sistemas t on t.id = d.id_tecnico where d.id = ?`, [element]);

                        let dbResponseOther = await databaseManager.executeQueries(sql);

                        iterator.diagnosticosVinculados[key] = {...dbResponseOther.resultData[0] };

                        if (iterator.diagnosticosVinculados[key].ids_catalogo_diagnostico) {
                            iterator.diagnosticosVinculados[key].ids_catalogo_diagnostico = iterator.diagnosticosVinculados[key].ids_catalogo_diagnostico.split(',');

                            let attribute = iterator.diagnosticosVinculados[key].ids_catalogo_diagnostico;
                            for (const key in attribute) {
                                if (attribute.hasOwnProperty(key)) {
                                    const element = attribute[key];
                                    sql = SqlString.format(`SELECT * FROM catalogo_diagnostico  where id = ?`, [element]);
                                    dbResponseOther = await databaseManager.executeQueries(sql);

                                    attribute[key] = {...dbResponseOther.resultData[0] };
                                }
                            }
                        }
                    }
                }
            }

            dbResponse.resultData = solucionesEjecutadas;
            resClient.status(dbResponse.responseCode).send({...dbResponse });
        } else {
            resClient.status(dbResponse.responseCode).send({...dbResponse });
        }

    } else {
        resClient.status(validationResult.responseCode).send({
            ...validationResult
        });
    }
}

async function changeTicketState(reqClient, resClient, databaseManager) {

    let ids = reqClient.body;
    let validationResult = validateModel(ids, schema.changeTicketState);
    if (validationResult.responseStatus) {
        let sql = SqlString.format(`UPDATE tickets SET estado_ticket = 3, fecha_cierre = now() WHERE  id = ?;`, [ids.id_ticket]);
        let dbResponse = await databaseManager.executeQueries(sql);
        if (dbResponse.responseStatus) {
            sql = SqlString.format(`UPDATE solucion_ejecutada SET resultado = true  WHERE  id = ?;`, [ids.id_catalogo_solucuiones]);
            dbResponse = await databaseManager.executeQueries(sql);
            resClient.status(dbResponse.responseCode).send({
                ...dbResponse
            });
            io.emit('asignacionTicket', {
                message: 'se asigno correctamente'
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
    getPruebaEjecutadaBySintoma,
    updateTagsBySintoma,
    InsertDiagnostico,
    getDiagnosticoByTicket,
    getCatalogoDiagnostico,
    searchCatalogoSoliciones,
    InsertSolucionEjecutada,
    getSolucionesEjecutadasByTickets,
    changeTicketState
}