// los requires
var exp = require('express');
var mgse = require('mongoose');
var bdp = require('body-parser');

var app = exp();
// body parser section
app.use(bdp.urlencoded({ extended: false }));
app.use(bdp.json());
// inicializar variables

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

mgse.connection.openUri('mongodb://localhost:27017/HospitalDB',
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Base de datos: \x1b[32m%s\x1b', 'online');
        }
    });
// rutas
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server: \x1b[32m%s\x1b', 'online');
});