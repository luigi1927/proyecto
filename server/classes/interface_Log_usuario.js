const SqlString = require('sqlstring');
const { executeQueries } = require('../database/mysql');

class InterfaceLogUser {
    requestParameters;
    constructor(id_usuario, observacion, id_tipo_evento_usuario) {
        this.requestParameters = {
            id_usuario,
            fecha_evento: new Date(),
            observacion,
            id_tipo_evento_usuario
        }
    }

    async insertLogEventoUsers() {
        let sql = SqlString.format(`INSERT INTO eventos_log_usuario SET ?`, this.requestParameters);
        let response = await executeQueries(sql);
        return response;
    }
}
class InterfaceLogAdminUser {
    requestParameters;
    constructor(id_tecnico_sistemas, observacion, id_tipo_evento_usuario) {
        this.requestParameters = {
            id_tecnico_sistemas,
            fecha_evento: new Date(),
            observacion,
            id_tipo_evento_usuario
        }
    }

    async insertLogEventoTecnico() {
        let sql = SqlString.format(`INSERT INTO eventos_log_tecnico_sistemas SET ?`, this.requestParameters);
        let response = await executeQueries(sql);
        return response;
    }

}

module.exports = {
    InterfaceLogUser,
    InterfaceLogAdminUser
}