var md = require('../models/medico');
var bcrypt = require('bcryptjs');
var aux = require('./utils');
// ======================
// TODOS LOS mdS====
// ======================
exports.list_all_mds = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
    md.find({})
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .skip(desde)
        .limit(limite)
        .exec((err, mdDb) => err ?
            aux.errorResp(res, err) :
            aux.pagination(res, mdDb, md));
};
// ======================
// OBTENER md=======
// ======================
exports.get_mdByID = (req, res) => {
        md.findOne({ '_id': req.params.id }, {}, { sort: { 'fecha': -1 } },
            (err, mdDb) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, mdDb))
    }
    //  ======================
    //  CREAR md=========
    //  ======================
exports.create_md = (req, res) => {
        req.body.usuario = req.authUser._id;
        new md(req.body).save(
            (err, mdDb) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, mdDb)
        );
    }
    // ======================
    // ACTUALIZAR md====
    // ======================
exports.update_md = (req, res) => {
        md.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true },
            (err, mdDb) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, mdDb)
        )
    }
    // ======================
    // BORRAR md========
    // ======================
exports.delete_md = (req, res) => {
    md.findByIdAndRemove(req.params.id,
        (err, mdDb) => {
            err ?
                aux.errorResp(res, err) :
                aux.validRespond(res, mdDb);
        })
}