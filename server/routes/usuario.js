const express = require('express');
const { Insert, getByCorreo, oficinaGetList, grupoGetList } = require('../controllers/usuario');

const app = express();

app.post('/usuario/insert', (req, res) => {
    Insert(req, res, app.get('databaseManager'));
});

app.get('/usuario/getByCorreo', (req, res) => {
    getByCorreo(req, res, app.get('databaseManager'));
});

app.get('/oficina/getList', (req, res) => {
    oficinaGetList(req, res, app.get('databaseManager'));
});
app.get('/grupo/getList', (req, res) => {
    grupoGetList(req, res, app.get('databaseManager'));
});
module.exports = app;