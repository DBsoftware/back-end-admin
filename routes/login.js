var exp = require('express');
var app = exp();
var Usuario = require('../models/usuario');
var Ctrllr = require('../controllers/login');
var mdAuth = require('../middlewares/auth');

app.post('/google', Ctrllr.googleCtrler);
app.post('/', Ctrllr.loginCtrler);
app.get('/renuevaToken', mdAuth.verify_token, Ctrllr.renewToken);

module.exports = app;