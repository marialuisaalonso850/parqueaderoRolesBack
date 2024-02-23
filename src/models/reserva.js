const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  correo: {type: String, required: true},
  nombre: { type: String, required: true },
  telefono: { type: Number, required: true },
  lugarDisponible: { type: Boolean, default: true } 
  
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;