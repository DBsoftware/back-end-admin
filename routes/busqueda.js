var exp = require('express');
var app = exp();
var searchCtrllr = require('../controllers/busqueda');

app.get('/todo/:key', searchCtrllr.search_all);
app.get('/coleccion/:colecction/:key', searchCtrllr.search_specific);

module.exports = app;