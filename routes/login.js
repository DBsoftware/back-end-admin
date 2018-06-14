var exp = require('express');
var app = exp();
var Usuario = require('../models/usuario');
var Ctrllr = require('../controllers/login');
app.post('/google', Ctrllr.googleCtrler)
app.post('/', Ctrllr.loginCtrler);

module.exports = app;