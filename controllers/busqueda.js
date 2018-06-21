var aux = require('./utils');
var m = require('../models/medico');
var h = require('../models/hospital');
var u = require('../models/usuario');


// ==========================
// Busqueda Especifica
// ==========================

exports.search_specific = (req, res) => {
    var regex = new RegExp(req.params.key, 'i');
    switch (req.params.colecction) {
        case 'medicos':
            buscarMedicos(regex)
                .then(r => aux.validRespond(res, r));
            break;
        case 'usuarios':
            buscarUsuarios(regex)
                .then(r => aux.validRespond(res, r));
            break;
        case 'hospitales':
            buscarHospitales(regex)
                .then(r => aux.validRespond(res, r));
            break;
        default:
            aux.errorResp(res, { err: { message: 'error en la busqueda' } }, 400, 'La busqueda fue erronea')
    }
};


// ==========================
// Busqueda General
// ==========================
exports.search_all = (req, res) => {
    var regex = new RegExp(req.params.key, 'i');
    Promise.all([buscarHospitales(regex),
            buscarMedicos(regex),
            buscarUsuarios(regex)
        ])
        .then(r => aux.validRespond(res, r));
};

buscarHospitales = (param) => {
    return new Promise((resolve, reject) => {
        h.find({ 'nombre': param })
            .populate('usuario', 'nombre email')
            .exec((err, objR) => {
                (err) ?
                reject('Error al buscar hospitales', err):
                    resolve(objR);
            });
    });
}
buscarMedicos = (param) => {
    return new Promise((resolve, reject) => {
        m.find({ 'nombre': param })
            .populate('usuario', 'nombre email')
            .populate('hospital', 'nombre')
            .exec((err, objR) => {
                (err) ?
                reject('Error al buscar medicos', err):
                    resolve(objR);
            });
    });
}
buscarUsuarios = (param) => {
    return new Promise((resolve, reject) => {
        u.find({}, 'nombre email role img _id')
            .or([{ 'nombre': param }, { 'email': param }])
            .exec((err, objR) => {
                (err) ?
                reject('Error al buscar medicos', err):
                    resolve(objR);
            })

    })
}