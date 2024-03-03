const mongoose = require("mongoose");

const parqueaderoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  }
});

const ParqueaderoExiste = mongoose.model("parqueaderoexistente", parqueaderoSchema);
module.exports = ParqueaderoExiste;