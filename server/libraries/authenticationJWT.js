const jwt = require('jsonwebtoken');



let createAuthorization = (usuario) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * process.env.CADUCIDAD_TOKEN),
        data: usuario,
        ipSource: '::1',
        requestDate: Date.now(),
        creationDateToken: Date.now()
    }, process.env.SEED, { algorithm: 'HS256' });
}

module.exports = {
    createAuthorization
}