var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var medicoSchema = new Schema({
    titulo: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    contenido: { type: String, required: false },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});
module.exports = mongoose.model('Medico', medicoSchema);