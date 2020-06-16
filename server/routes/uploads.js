const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();



app.get('/getImagen/:img', (req, res) => {

    let img = req.params.img;
    let pathImagen = path.resolve(__dirname, `../uploads/${img}`);
    let noImagePath = path.resolve(__dirname, '../uploads/no-image.jpg')
    let imagenAmostrar = (fs.existsSync(pathImagen)) ? pathImagen : noImagePath;
    res.sendFile(imagenAmostrar);

});


module.exports = app;