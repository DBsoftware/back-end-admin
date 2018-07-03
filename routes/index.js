const express = require('express');

const app = express();

app.use('/usuarios', require('./usuario'));
app.use('/producto', require('./producto'));
app.use('/blog', require('./blog'));
app.use('/login', require('./login'));
app.use('/busqueda', require('./busqueda'));
app.use('/upload', require('./upload'));
app.use('/img', require('./imagenes'));
app.use('/', require('./app'));

module.exports = app;