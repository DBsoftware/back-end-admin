var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    titulo: { type: String, required: [true, 'El titulo es necesario'] },
    img: { type: String, required: false },
    contenido: { type: String, required: false },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});
module.exports = mongoose.model('Blog', schema);