const { io } = require('../server');
const { InterfaceLogUser, InterfaceLogAdminUser } = require('../classes/interface_Log_usuario');

io.on('connection', (client) => {
    console.log('Usuario Conectado');


    client.on('cerrarSesion', async(data, callack) => {
        if (data.empresa === 'platinum') {
            let interface = new InterfaceLogAdminUser(data.id, 'SALIO DE SESION', 3);
            let response = await interface.insertLogEventoTecnico();
            callack(response);
        } else {
            let interface = new InterfaceLogUser(data.id, 'SALIO DE SESION', 3);
            let response = await interface.insertLogEventoUsers();

            callack(response);
        }

    });





});

module.exports = {
    io
}