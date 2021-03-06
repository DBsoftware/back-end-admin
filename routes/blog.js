var exp = require('express');
var app = exp();
var model = require('../models/blog');
var Ctrllr = require('../controllers/blog');
var mdAuth = require('../middlewares/auth');
app.get('/', Ctrllr.list_all);
app.get('/:id', Ctrllr.get_ByID);
app.post('/', mdAuth.verify_token, Ctrllr.create);
app.put('/:id', mdAuth.verify_token, Ctrllr.update);
app.delete('/:id', mdAuth.verify_token, Ctrllr.delete);
module.exports = app;