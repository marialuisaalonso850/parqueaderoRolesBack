const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  nombre: { type: String, required: true },
  placa: { type: String, required: true},
  correo: { type: String, required: true },
  telefono: { type: Number, required: true },
  parqueadero: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } // Referencia al parqueadero
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
