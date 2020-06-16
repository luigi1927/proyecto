const jwt = require('jsonwebtoken');


// =====================
// Verificar Token
// =====================
let verifyToken = (requestClient, responseClient, next) => {

    let authorizationHeader = requestClient.get('authorization');
    if (authorizationHeader === undefined) {
        return responseClient.status(401).send({
            responseCode: 401,
            responseMessage: 'Autenticación inválida'
        });

    }
    let authorizationToken = authorizationHeader.replace("Bearer ", "");
    jwt.verify(authorizationToken, process.env.SEED, (err, objectValue) => {
        if (err) {

            return responseClient.status(403).send({
                responseCode: 403,
                responseMessage: 'SOLICITUD PROHIBIDA',
                err,

            });
        } else {
            requestClient.usuario = objectValue.usuario;
            next();
        }
    });

};


module.exports = {
    verifyToken,
}