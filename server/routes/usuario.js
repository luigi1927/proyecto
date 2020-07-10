const express = require('express');

const {
    Insert,
    getByCorreo,
    oficinaGetList,
    grupoGetList,
    usuarioOficina,
    getTecnicoSistemaByid,
    getList,
    update
} = require('../controllers/usuario');
const usuario = require('../controllers/usuario');
const { verifyToken } = require('../middlewares/authentication');

const app = express();
//pendiente
app.post('/usuario/insert', verifyToken, (req, res) => {
    Insert(req, res, app.get('databaseManager'));
});
//luis 
// esta ruta verifica si existe un usuario por correo---ok2
app.get('/usuario/getByCorreo', verifyToken, (req, res) => {
    getByCorreo(req, res, app.get('databaseManager'));
});
//luis
// esta ruta trae una lista de oficinas---ok2
app.get('/usuario/oficina/getList', verifyToken, (req, res) => {
    oficinaGetList(req, res, app.get('databaseManager'));
});
//luis
//esta ruta trae una lista de grupos ---ok2
app.get('/usuario/grupo/getList', verifyToken, (req, res) => {
    grupoGetList(req, res, app.get('databaseManager'));
});

// luis
// descirpcion:esta ruta esta encargada de traer los usuarios de oficina por pagina ---ok2
app.get('/usuario/getList', verifyToken, (reqClient, resClient) => {
    getList(reqClient, resClient, app.get('databaseManager'));
});
// autor luis
// descripcion : se inicializa la ruta para actualizar la tabla usuarios/oficina ---ok2
app.post('/usuario/update', verifyToken, (req, res) => {
    update(req, res, app.get('databaseManager'));
});
//ok2
app.get('/tecnico/sistema', verifyToken, (req, res) => {
    getTecnicoSistemaByid(req, res, app.get('databaseManager'));
});


module.exports = app;