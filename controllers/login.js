var U = require('../models/usuario');
var aux = require('./utils');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var conf = require('../config/config');

tokenStuff = function(res, u) {
    u['token'] = jwt.sign({ usuario: u }, conf.SEED, { expiresIn: 4500 });
    aux.rightLoginRespond(res, u);
}

exports.loginCtrler = (req, res) => {
    U.findOne({ email: req.body.email }, (err, uDB) => {
        if (err)
            aux.errorResp(res, err, 500);
        (!uDB) ?
        aux.errorResp(res, err, 500, "usuario no encontrado"):
            ((!bcrypt.compareSync(req.body.password, uDB.password)) ?
                aux.errorResp(res, err, 500, "password incorrecto") :
                tokenStuff(res, uDB))
    });
};