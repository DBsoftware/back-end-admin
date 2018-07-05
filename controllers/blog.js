var model = require('../models/blog');
var aux = require('./utils');
// ======================
// TODOS LOS mdS====
// ======================
exports.list_all = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
    model.find({})
        .populate('autor', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, document) => err ?
            aux.errorResp(res, err) :
            aux.pagination(res, document, model));
};
// ======================
// OBTENER hp=======
// ======================
exports.get_ByID = (req, res) => {
    model.findById(req.params.id)
        .populate('autor', 'nombre img email')
        .exec(
            (err, document) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, document)
        );
};
//  ======================
//  CREAR hp=========
//  ======================
exports.create = (req, res) => {
        req.body.autor = req.authUser._id;
        new model(req.body).save(
            (err, document) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, document)
        );
    }
    // ======================
    // ACTUALIZAR hp====
    // ======================
exports.update = (req, res) => {
        model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true },
            (err, document) => err ?
            aux.errorResp(res, err) :
            aux.validRespond(res, document)
        )
    }
    // ======================
    // BORRAR hp========
    // ======================
exports.delete = (req, res) => {
    model.findByIdAndRemove(req.params.id,
        (err, document) => {
            err ?
                aux.errorResp(res, err) :
                aux.validRespond(res, document);
        })
}