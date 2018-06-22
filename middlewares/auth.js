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
// ===========================================
// Verificar ROLE u que se el mismo Usuario
// ===========================================
exports.verify_role = (req, res, next) => {
    var usuario = req.authUser;
    (usuario.role === 'ADMIN_ROLE' || usuario._id === req.params.id) ?
    next():
        aux.errorResp(res, { err: { message: 'Procedimiento erroneo' } }, 401, "Token incorrecto");
};