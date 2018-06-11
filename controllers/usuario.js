var Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
var aux = require('./utils');
// ======================
// TODOS LOS UsuarioS====
// ======================
exports.list_all_users = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, user) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, user));
};
// ======================
// OBTENER Usuario=======
// ======================
exports.get_userByID = (req, res) => {
        Usuario.findOne({ '_id': req.params.id }, {}, { sort: { 'fecha': -1 } },
            (err, user) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, user))
    }
    //  ======================
    //  CREAR Usuario=========
    //  ======================
exports.create_user = (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        new Usuario(req.body).save(
            (err, user) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, user)
        );
    }
    // ======================
    // ACTUALIZAR Usuario====
    // ======================
exports.update_user = (req, res) => {
        Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true },
            (err, user) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, user)
        )
    }
    // ======================
    // BORRAR Usuario========
    // ======================
exports.delete_user = (req, res) => {
    Usuario.findByIdAndRemove(req.params.id,
        (err, user) => {
            err ?
                aux.errorResp(res, err) :
                aux.validRespond(res, user);
        })
}