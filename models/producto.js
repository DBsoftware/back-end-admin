var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    desc: { type: String, required: false },
    precio: { type: Number, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'producto' });
module.exports = mongoose.model('producto', schema);