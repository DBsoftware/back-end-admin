var hp = require('../models/hospital');
var bcrypt = require('bcryptjs');
var aux = require('./utils');
// ======================
// TODOS LOS mdS====
// ======================
exports.list_all_hps = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
    hp.find({})
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, hpDb) => err ?
            aux.errorResp(res, err) :
            aux.pagination(res, hpDb, hp));
};
// ======================
// OBTENER hp=======
// ======================
exports.get_hpByID = (req, res) => {
    hp.findById(req.params.id)
        .populate('usuario', 'nombre img email')
        .exec(
            (err, hpDb) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, hpDb)
        );
};
//  ======================
//  CREAR hp=========
//  ======================
exports.create_hp = (req, res) => {
        req.body.usuario = req.authUser._id;
        new hp(req.body).save(
            (err, hpDb) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, hpDb)
        );
    }
    // ======================
    // ACTUALIZAR hp====
    // ======================
exports.update_hp = (req, res) => {
        hp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true },
            (err, hpDb) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, hpDb)
        )
    }
    // ======================
    // BORRAR hp========
    // ======================
exports.delete_hp = (req, res) => {
    hp.findByIdAndRemove(req.params.id,
        (err, hpDb) => {
            err ?
                aux.errorResp(res, err) :
                aux.validRespond(res, hpDb);
        })
}