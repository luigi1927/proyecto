const Joi = require('@hapi/joi');



const Insert = Joi.array().items(Joi.object().keys({
    id_usuario: Joi.number().required(),
    id_dispositivo: Joi.number().allow(null),
    id_aplicacion: Joi.number().allow(null),
    sintoma: Joi.string().required(),
}).required());


const assignTechnical = Joi.object().keys({
    id_tecnico_asignado: Joi.number().required().allow(null),
    id_tecnico: Joi.number().required(),
    id_ticket: Joi.number().required(),
});

const getByTechnical = Joi.object().keys({
    id_tecnico: Joi.number().required()
});

const getByUser = Joi.object().keys({
    id_usuario: Joi.number().required()
});

const getSintomas = Joi.object().keys({
    id_ticket: Joi.number().required()
});

const GetPruebaEjecutadaBySintoma = Joi.object().keys({
    id_sintoma: Joi.number().required()
});

const InsertComentarioTecnico = Joi.object().keys({
    id_tipo_comentario_tecnico: Joi.number().required(),
    comentario: Joi.string().required(),
    id_tecnico: Joi.number().required(),
    id_ticket: Joi.number().required()
});

const InsertPruebaEjecutada = Joi.object().keys({
    id_catalogo: Joi.number().required(),
    id_sintoma: Joi.number().required(),
    id_tecnico: Joi.number().required(),
    id_tipificacion_prueba: Joi.number().required(),
    observacion: Joi.string().required()
})

const updateTagsBySintoma = Joi.object().keys({
    id_sintoma: Joi.number().required(),
    tags: Joi.array().items(Joi.string().required()).allow(null)
});


const InsertDiagnostico = Joi.object().keys({
    id_tecnico: Joi.number().required(),
    id_ticket: Joi.number().required(),
    diagnostico: Joi.string().required(),
    ids_pruebas_ejecutadas: Joi.array().items(Joi.number().required()).allow(null).required(),
    ids_catalogo_diagnostico: Joi.array().items(Joi.number().required()).allow(null).required()
});

const getDiagnosticoByTicket = Joi.object().keys({
    id_ticket: Joi.number().required()
});

const searchCatalogoSoluciones = Joi.object().keys({
    parameter: Joi.string().required().allow('')
});

const InsertSolucionEjecutada = Joi.object().keys({
    id_catalogo_solucion: Joi.number().required(),
    id_ticket: Joi.number().required(),
    ids_diagnostico: Joi.array().items(Joi.number().required()).required(),
    id_tecnico: Joi.number().required(),
    resultado: Joi.boolean().default(false)
});

const changeTicketState = Joi.object().keys({
    id_tecnico: Joi.number().required(),
    id_ticket: Joi.number().required(),
    id_catalogo_soluciones: Joi.number().required()
});

module.exports = {
    Insert,
    assignTechnical,
    getByTechnical,
    getByUser,
    getSintomas,
    InsertComentarioTecnico,
    InsertPruebaEjecutada,
    GetPruebaEjecutadaBySintoma,
    updateTagsBySintoma,
    InsertDiagnostico,
    getDiagnosticoByTicket,
    searchCatalogoSoluciones,
    InsertSolucionEjecutada,
    changeTicketState
}