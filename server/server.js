require('./config/config');

const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
let server = http.createServer(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const multer = require('multer');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ACCESS_CONTROL_ALLOW);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "50mb" }));

module.exports.io = socketIO(server);
require('./sockets/socket');
app.use(require('./routes/index'));
app.set('port', process.env.PORT);
// escuchando el servidor
server.listen(process.env.PORT, () => console.log(`Escuchando por el puerto ${process.env.PORT}`));