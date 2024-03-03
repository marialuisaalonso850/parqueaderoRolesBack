const Reserva = require('../models/reserva.js');
const Parqueadero = require('../models/post.js');
const sendConfirmationReserva= require('../routes/correoReserva.js')

async function createReserva(req, res) {
  try {
    const reserva = new Reserva({
      date: req.body.date,
      time: req.body.time,
      nombre: req.body.nombre,
      correo: req.body.correo,
      placa: req.body.placa,
      telefono: req.body.telefono,  
      parqueadero: req.body.parqueaderoId 
      
    });

    await reserva.save();

    // Disminuye el número de puestos disponibles en el parqueadero correspondiente
    await Parqueadero.findByIdAndUpdate(req.body.parqueaderoId, { $inc: { puestos: -1 } });
    

    
    
    await sendConfirmationReserva(reserva.nombre,
      reserva.date,
      reserva.time,
      reserva.correo,
      reserva.telefono,
      reserva.placa,
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
        placa: req.body.placa,
        telefono: req.body.telefono,
        
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
    
    // Incrementar el número de puestos disponibles en el parqueadero correspondiente
    await Parqueadero.findByIdAndUpdate(reserva.parqueadero, { $inc: { puestos: 1 } });
    
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
