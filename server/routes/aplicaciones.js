const express = require('express');
const app = express();
const { getByRelationAppUsers } = require('../controllers/aplicaciones');
const { verifyToken } = require('../middlewares/authentication');

app.get('/aplicaciones/getByRelationAppUsers', verifyToken, (req, res) => {
    getByRelationAppUsers(req, res, app.get('databaseManager'));
});
module.exports = app;