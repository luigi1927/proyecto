const express = require('express');
const databaseManager = require('../database/mysql')
const app = express();

app.set('databaseManager', databaseManager);
app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./dispositivos'));
app.use(require('./uploads'));
app.use(require('./aplicaciones'));
app.use(require('./tickets'));
module.exports = app;