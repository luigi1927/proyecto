const express = require('express');
const app = express();
const ticketsController = require('../controllers/tickets');
const { verifyToken } = require('../middlewares/authentication');

app.put('/tickets/insert', verifyToken, (req, res) => {
    ticketsController.Insert(req, res, app.get('databaseManager'));
});
app.get('/tickets/getList', verifyToken, (req, res) => {
    ticketsController.getList(req, res, app.get('databaseManager'));
});
app.post('/tickets/assignTechnical', verifyToken, (req, res) => {
    ticketsController.assignTechnical(req, res, app.get('databaseManager'));
});


app.get('/tickets/getByTechnical', verifyToken, (req, res) => {
    ticketsController.getByTechnical(req, res, app.get('databaseManager'));
});

app.get('/tickets/getListNameTechnical', verifyToken, (req, res) => {
    ticketsController.getListNameTechnical(req, res, app.get('databaseManager'));
});
app.get('/tickets/getByUser', verifyToken, (req, res) => {
    ticketsController.getByUser(req, res, app.get('databaseManager'));
});

app.get('/tickets/getSintomas', verifyToken, (req, res) => {
    ticketsController.getSintomas(req, res, app.get('databaseManager'));
});

app.get('/tickets/getComentariosTecnicosByTicket', verifyToken, (req, res) => {
    ticketsController.getComentariosTecnicosByTicket(req, res, app.get('databaseManager'));
});

app.get('/tickets/getTipoComentarioTecnico', verifyToken, (req, res) => {
    ticketsController.getTipoComentarioTecnico(req, res, app.get('databaseManager'));
});

app.put('/tickets/InsertComentarioTecnico', verifyToken, (req, res) => {
    ticketsController.InsertComentarioTecnico(req, res, app.get('databaseManager'));
});

app.get('/tickets/getCatalogoPrueba', verifyToken, (req, res) => {
    ticketsController.getCatalogoPrueba(req, res, app.get('databaseManager'));
});
app.get('/tickets/getTipificacionPrueba', verifyToken, (req, res) => {
    ticketsController.getTipificacionPrueba(req, res, app.get('databaseManager'));
});


app.put('/tickets/InsertPruebaEjecutada', verifyToken, (req, res) => {
    ticketsController.InsertPruebaEjecutada(req, res, app.get('databaseManager'));
});
app.get('/tickets/getPruebaEjecutadaBySintoma', verifyToken, (req, res) => {
    ticketsController.getPruebaEjecutadaBySintoma(req, res, app.get('databaseManager'));
});

module.exports = app;