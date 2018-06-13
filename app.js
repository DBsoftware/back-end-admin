// los requires
var exp = require('express');
var mgse = require('mongoose');
var bdp = require('body-parser');
var serveIndex = require('serve-index')

var app = exp();
// body parser section
app.use(bdp.urlencoded({ extended: false }));
app.use(bdp.json());
// inicializar variables

// server index config
var serveIndex = require('serve-index');
app.use(exp.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));

mgse.connection.openUri('mongodb://localhost:27017/HospitalDB',
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Base de datos: \x1b[32m%s\x1b', 'online');
        }
    });
// rutas
app.use(require('./routes/index'));

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server: \x1b[32m%s\x1b', 'online');
});