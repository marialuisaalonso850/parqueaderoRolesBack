const Reserva = require('../models/reserva.js');
const sendConfirmationReserva= require('../routes/correoReserva.js')

async function createReserva(req, res) {
  try {
    const reserva = new Reserva({
      date: req.body.date,
        time: req.body.time,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        lugarDisponible: req.body.lugarDisponible,

    });
    await reserva.save();

    await sendConfirmationReserva(reserva.nombre,
      reserva.date,
      reserva.time,
      reserva.correo,
      reserva.telefono,
    );


    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getAllReservas(req, res) {
  try {
    const reservas = await Reserva.find();
    res.send(reservas);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateReserva(req, res) {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      {
        date: req.body.date,
        time: req.body.time,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        lugarDisponible: req.body.lugarDisponible,
      },
      { new: true }
    );
    if (!reserva) return res.status(404).send("Reserva not found");
    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getReservaById(req, res) {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).send("Reserva not found");
    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteReserva(req, res) {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).send("Reserva not found");
    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createReserva,
  getAllReservas,
  updateReserva,
  getReservaById,
  deleteReserva
};