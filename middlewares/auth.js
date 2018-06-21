var jwt = require('jsonwebtoken');
var conf = require('../config/config');
var aux = require('../controllers/utils');
// ======================
// Verificar token=======
// ======================
exports.verify_token = (req, res, next) => {
    var t = req.query.token;
    jwt.verify(t, conf.SEED, (err, decoded) => {
        error = false;
        !decoded ? error = true : req.authUser = decoded.usuario;
        err || error ? aux.errorResp(res, err, 401, "Token incorrecto") : next();
    });
};