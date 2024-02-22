const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: { type: String, required: true} // Campo para almacenar el nombre del rol
});

module.exports = mongoose.model('Role', roleSchema);
