var exp = require('express');
var app = exp();
var med = require('../models/medico');
var mdCtrllr = require('../controllers/medico');
var mdAuth = require('../middlewares/auth');
app.get('/', mdCtrllr.list_all_mds);
app.get('/:id', mdCtrllr.get_mdByID);
app.post('/', mdAuth.verify_token, mdCtrllr.create_md);
app.put('/:id', mdAuth.verify_token, mdCtrllr.update_md);
app.delete('/:id', mdAuth.verify_token, mdCtrllr.delete_md);
module.exports = app;