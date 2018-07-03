var aux = require('./utils');
var b = require('../models/blog');
var p = require('../models/producto');
var u = require('../models/usuario');


// ==========================
// Busqueda Especifica
// ==========================

exports.search_specific = (req, res) => {
    var regex = new RegExp(req.params.key, 'i');
    switch (req.params.colecction) {
        case 'blogs':
            buscarblogs(regex)
                .then(r => aux.validRespond(res, r));
            break;
        case 'usuarios':
            buscarUsuarios(regex)
                .then(r => aux.validRespond(res, r));
            break;
        case 'productos':
            buscarproductos(regex)
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
    Promise.all([
            buscarproductos(regex),
            buscarblogs(regex),
            buscarUsuarios(regex)
        ])
        .then(r => aux.validRespond(res, r));
};

buscarproductos = (param) => {
    return new Promise((resolve, reject) => {
        p.find({ 'nombre': param }, 'nombre img desc precio usuario')
            .populate('usuario', 'nombre email')
            .exec((err, documents) => {
                (err) ?
                reject('Error al buscar productos', err):
                    resolve(documents);
            });
    });
}
buscarblogs = (param) => {
    return new Promise((resolve, reject) => {
        b.find({ 'titulo': param }, 'titulo img autor contenido')
            .populate('usuario', 'nombre email')
            .exec((err, documents) => {
                (err) ?
                reject('Error al buscar blogs', err):
                    resolve(documents);
            });
    });
}
buscarUsuarios = (param) => {
    return new Promise((resolve, reject) => {
        u.find({}, 'nombre email role img _id')
            .or([{ 'nombre': param }, { 'email': param }])
            .exec((err, documents) => {
                (err) ?
                reject('Error al buscar blogs', err):
                    resolve(documents);
            })

    })
}