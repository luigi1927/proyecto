const express = require('express');
const app = express();
const { getByUsers, updateDispositivo, getTipo, getList } = require('../controllers/dispositivos');
const { verifyToken } = require('../middlewares/authentication');
const { update } = require('../controllers/usuario');
//ok2
app.get('/dispositivo/getByUsers', verifyToken, (req, res) => {
    getByUsers(req, res, app.get('databaseManager'));
});
// autor luis
// descripcion : se inicializa la ruta para actualizar la tabla dispositivo ---ok2
app.post('/dispositivo/updateDispositivo', verifyToken, (req, res) => {
    updateDispositivo(req, res, app.get('databaseManager'));
});


app.get('/dispositivo/getTipo', verifyToken, (req, res) => {
    getTipo(req, res, app.get('databaseManager'));
});

app.get('/dispositivo/getList', (req, res) => {
    getList(req, res, app.get('databaseManager'));
});

module.exports = app;