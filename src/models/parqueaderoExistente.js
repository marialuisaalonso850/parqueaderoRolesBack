const mongoose = require("mongoose");

const parqueaderoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  latitud: {
    type: String,
    required: true,
  },
  longitud: {
    type: String,
    required: true,
  }
});

const ParqueaderoExiste = mongoose.model("parqueaderoexistente", parqueaderoSchema);
module.exports = ParqueaderoExiste;