var mgs = require('mongoose');
var muV = require('mongoose-unique-validator');
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}
var Sch = mgs.Schema;
var userSch = new Sch({
    'nombre': { type: String, required: [true, 'El nombre es necesario'] },
    'email': { type: String, unique: true, require: [true, 'El email es necesario'] },
    'password': { type: String, required: [true, 'El password es necesario'] },
    'img': { type: String, required: [false] },
    'role': { type: String, required: [true], default: 'USER_ROLE', enum: rolesValidos },
    'google': { type: Boolean, default: false }
});

userSch.plugin(muV, { message: 'El {PATH} debe de ser unico' });

module.exports = mgs.model('Usuario', userSch);