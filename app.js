// los requires
var exp = require('express');
var mgse = require('mongoose');

// inicializar variables
var app = exp();

mgse.connection.openUri('mongodb://localhost:27017/HospitalDB',
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Base de datos: \x1b[32m%s\x1b', 'online');
        }
    });
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada'
    });
});

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server: \x1b[32m%s\x1b', 'online');
});