var U = require('../models/usuario');
var aux = require('./utils');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var conf = require('../config/config');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(conf.CLIENT_ID);

// =============================
// autenticacion de google
// =============================

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: conf.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };
}

tokenStuff = function(res, u) {
    u['token'] = jwt.sign({ usuario: u }, conf.SEED, { expiresIn: 4500 });
    aux.rightLoginRespond(res, u);
}

exports.loginCtrler = (req, res) => {
    U.findOne({ email: req.body.email }, (err, uDB) => {
        if (err)
            aux.errorResp(res, err, 500);
        (!uDB) ?
        aux.errorResp(res, err, 500, "usuario no encontrado"):
            ((!bcrypt.compareSync(req.body.password, uDB.password)) ?
                aux.errorResp(res, err, 500, "password incorrecto") :
                tokenStuff(res, uDB))
    });
};

exports.googleCtrler = async(req, res) => {
    let gUser = await verify(req.body.token)
        .catch(err => aux.errorResp(res, err, 401, "token invalido"));

    U.findOne({ email: gUser.email }, (err, oDB) => {
        err ? aux.errorResp(res, err, 500, "token invalido") :
            (oDB ? (!oDB.google ? aux.errorResp(res, {}, 400, "Debe usar auth normal") :
                    tokenStuff(res, oDB)) :
                newGUser(res, gUser));
    });
    //     res.status(200).json({
    //     ok: true,
    //     gUser
    // });
}

newGUser = (res, gUser) => {
    gUser.password = ":)"
    new U(gUser).save((e, oDB) => {
        e ? aux.errorResp(res, e, 403, "Error creando usuario") :
            tokenStuff(res, oDB);
    });

}