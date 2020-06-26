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


app.post('/tickets/updateTagsBySintoma', verifyToken, (req, res) => {
    ticketsController.updateTagsBySintoma(req, res, app.get('databaseManager'));
});

app.put('/tickets/InsertDiagnostico', verifyToken, (req, res) => {
    ticketsController.InsertDiagnostico(req, res, app.get('databaseManager'));
});

app.get('/tickets/getDiagnosticoByTicket', verifyToken, (req, res) => {
    ticketsController.getDiagnosticoByTicket(req, res, app.get('databaseManager'));
});

app.get('/tickets/getCatalogoDiagnostico', verifyToken, (req, res) => {
    ticketsController.getCatalogoDiagnostico(req, res, app.get('databaseManager'));
});
app.get('/tickets/searchCatalogoSoliciones', verifyToken, (req, res) => {
    ticketsController.searchCatalogoSoliciones(req, res, app.get('databaseManager'));
});

app.put('/tickets/InsertSolucionEjecutada', verifyToken, (req, res) => {
    ticketsController.InsertSolucionEjecutada(req, res, app.get('databaseManager'));
});

app.post('/tickets/changeTicketState', verifyToken, (req, res) => {
    ticketsController.changeTicketState(req, res, app.get('databaseManager'));
});
app.get('/tickets/getSolucionesEjecutadasByTickets', verifyToken, (req, res) => {
    ticketsController.getSolucionesEjecutadasByTickets(req, res, app.get('databaseManager'));
});






module.exports = app;