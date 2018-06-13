const express = require('express');

const app = express();

app.use('/user', require('./usuario'));
app.use('/hospital', require('./hospital'));
app.use('/medico', require('./medico'));
app.use('/login', require('./login'));
app.use('/busqueda', require('./busqueda'));
app.use('/upload', require('./upload'));
app.use('/img', require('./imagenes'));
app.use('/', require('./app'));

module.exports = app;