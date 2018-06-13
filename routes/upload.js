var exp = require('express');
var upd = require('express-fileupload');
var m = require('../models/medico');
var h = require('../models/hospital');
var u = require('../models/usuario');
var aux = require('../controllers/utils');
var fs = require('fs');

var app = exp();

app.use(upd());
app.put('/:tipo/:id', (req, res) => {
    // req.params.tipo y req.params.id
    if (['medicos', 'usuarios', 'hospitales'].indexOf(req.params.tipo) < 0)
        aux.errorResp(res, { err: { message: 'Tipo equivocadp' } }, 400, 'tipo seleccionado erroneo');
    if (!req.files)
        aux.errorResp(res, { err: { message: 'No selecciono nada' } }, 400, 'Debe seleccionar una imagen');

    var arch = req.files.img;
    var ext = arch.name.split('.').slice(-1)[0];

    if (['png', 'jpg', 'gif', 'jpeg'].indexOf(ext) < 0) {
        aux.errorResp(res, { err: { message: 'Tipo de imagen no permitida' } }, 400,
            `los tipos de imagen permitidos son ${['png', 'jpg', 'gif', 'jpeg'].join(' ')}`);
    } else {
        var name = `${req.params.id}-${new Date().getMilliseconds()}.${ext}`
        var path = `./uploads/${req.params.tipo}/${name}`;
        arch.mv(path, err => {
            err ? aux.errorResp(res, { err: { message: 'No se pudo cargar' } }, 500, 'No se ha podido cargar la imagen') :
                subirPorTipo(req.params.tipo, req.params.id, name, res);
        });

    }
});


subirPorTipo = (tipo, id, name, res) => {
    switch (tipo) {
        case 'usuarios':
            u.findById(id, (err, oDB) => {
                if (err) aux.errorResp(res, { err: { message: 'Error' } }, 500, 'erro en base de datos');
                if (!oDB) aux.errorResp(res, { err: { message: 'Error' } }, 400, 'Registro no encontrado');
                var oldPath = `./uploads/${tipo}/${oDB.img}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                oDB.img = name;
                oDB.save((err, oADB) => {
                    aux.validRespond(res, oADB);
                });
            });
            break;
        case 'medicos':
            m.findById(id, (err, oDB) => {
                if (err) aux.errorResp(res, { err: { message: 'Error' } }, 500, 'erro en base de datos');
                if (!oDB) aux.errorResp(res, { err: { message: 'Error' } }, 400, 'Registro no encontrado');
                var oldPath = `./uploads/${tipo}/${oDB.img}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                oDB.img = name;
                oDB.save((err, oADB) => {
                    aux.validRespond(res, oADB);
                });
            });
            break;
        case 'hospitales':
            h.findById(id, (err, oDB) => {
                if (err) aux.errorResp(res, { err: { message: 'Error' } }, 500, 'erro en base de datos');
                if (!oDB) aux.errorResp(res, { err: { message: 'Error' } }, 400, 'Registro no encontrado');
                var oldPath = `./uploads/${tipo}/${oDB.img}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                oDB.img = name;
                oDB.save((err, oADB) => {
                    aux.validRespond(res, oADB);
                });
            });
            break;
    }
}

module.exports = app;