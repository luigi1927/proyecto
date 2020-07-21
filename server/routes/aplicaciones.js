const express = require('express');
const app = express();
const { getByRelationAppUsers, getApp, InsertRelApp, DeleteRelapp } = require('../controllers/aplicaciones');
const { verifyToken } = require('../middlewares/authentication');
//OK2
app.get('/aplicaciones/getByRelationAppUsers', verifyToken, (req, res) => {
    getByRelationAppUsers(req, res, app.get('databaseManager'));
});

app.get('/aplicaciones/getApp', (req, res) => {
    getApp(req, res, app.get('databaseManager'));
});

app.put('/aplicaciones/InsertRelApp', (req, res) => {
    InsertRelApp(req, res, app.get('databaseManager'));
});

app.delete('/aplicaciones/DeleteRelapp', (req, res) => {
    DeleteRelapp(req, res, app.get('databaseManager'));
});
module.exports = app;