const express = require('express');
const app = express();
const { getByUsers } = require('../controllers/dispositivos');
const { verifyToken } = require('../middlewares/authentication');

app.get('/dispositivo/getByUsers', verifyToken, (req, res) => {
    getByUsers(req, res, app.get('databaseManager'));
});
module.exports = app;