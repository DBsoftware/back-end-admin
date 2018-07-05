var aux = require('./utils');
var b = require('../models/blog');
var p = require('../models/producto');
var u = require('../models/usuario');


// ==========================
// Busqueda Especifica
// ==========================

exports.search_specific = (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;
    var regex = new RegExp(req.params.key, 'i');
    switch (req.params.colecction) {
        case 'blogs':
            buscarblogs(regex, desde, limite)
                .then(r => aux.pagination(res, r, b, { 'titulo': regex }));
            break;
        case 'usuarios':
            buscarUsuarios(regex, desde, limite)
                .then(r => aux.pagination(res, r, u));
            break;
        case 'productos':
            buscarproductos(regex, desde, limite)
                .then(r => aux.pagination(res, r, p, { 'nombre': regex }));
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
            buscarproductos(regex, 0, 0),
            buscarblogs(regex, 0, 0),
            buscarUsuarios(regex, 0, 0)
        ])
        .then(r => aux.validRespond(res, r));
};

buscarproductos = (param, desde, limite) => {
    return new Promise((resolve, reject) => {
        p.find({ 'nombre': param }, 'nombre img desc precio usuario')
            .populate('usuario', 'nombre email')
            .skip(desde)
            .limit(limite)
            .exec((err, documents) => {
                (err) ?
                reject('Error al buscar productos', err):
                    resolve(documents);
            });
    });
}
buscarblogs = (param, desde, limite) => {
    return new Promise((resolve, reject) => {
        b.find({ 'titulo': param }, 'titulo img autor contenido')
            .populate('usuario', 'nombre email')
            .skip(desde)
            .limit(limite)
            .exec((err, documents) => {
                (err) ?
                reject('Error al buscar blogs', err):
                    resolve(documents);
            });
    });
}
buscarUsuarios = (param, desde, limite) => {
    return new Promise((resolve, reject) => {
        u.find({}, 'nombre email role img _id')
            .or([{ 'nombre': param }, { 'email': param }])
            .skip(desde)
            .limit(limite)
            .exec((err, documents) => {
                (err) ?
                reject('Error al buscar blogs', err):
                    resolve(documents);
            })

    })
}