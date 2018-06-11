var exp = require('express');

var app = exp();


app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada'
    });
});

module.exports = app;