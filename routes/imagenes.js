var exp = require('express');

var app = exp();
const path = require('path');
const fs = require('fs');

app.get('/:tipo/:img', (req, res, next) => {
    var t = req.params.tipo;
    var i = req.params.img;

    var pathImagen = path.resolve(__dirname, `../uploads/${t}/${i}`);
    (fs.existsSync(pathImagen)) ?
    res.sendFile(pathImagen):
        res.sendFile(path.resolve(__dirname, '../assets/no-img.jpg'));

});

module.exports = app;