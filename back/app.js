const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');




//configuraciones

const PORT = process.env.PORT || 3000;


// iniciando el servidor

const app = express();


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'papeleria'
});

// RUTAS DEL SERVIDOR

app.get('/', (req, res) => {
    res.send('bienvenidos a mi aplicacion');
});

// listar los productos

app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Sin resultados')
        }
    });
});

// listar solo un producto

app.get('/productos/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM productos WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.send('Sin resultado')
        }
    });
});

// AGREGAR producto

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO productos SET ?';

    const productoObj = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    };
    connection.query(sql, productoObj, error => {
        if (error) throw error;
        res.redirect('/productos');

    });
});

// ACTUALIZAR producto

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const sql = `UPDATE productos SET title = '${title}', description='${description}', image='${image}' WHERE id =${id}`;
    connection.query(sql, error => {
        if (error) throw error
        else {
            res.send({ responseStatus: true });
        };

        //res.send('producto actualizado');
        //res.redirect('/productos');
    });
});

// eliminar producto

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM productos WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        else {
            res.send({ responseStatus: true });
        };
    });
});

// check conexion BD

connection.connect(error => {
    if (error) throw error;
    console.log('Base de datos conectada');
});

app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));