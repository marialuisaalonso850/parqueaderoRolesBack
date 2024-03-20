const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
 
  title: { type: String, required: true,},
  content: {type: String, required: true,},
  horarios: { type: String, required: true,},
  tarifaCarro: { type: String, required: true, },
  tarifaMoto: { type: String, required: true,},
  telefono: {
    type: String,
    required: true,
  },
  nosotros: {
    type: String,
    required: true,
  },
  longitud: { 
    type: Number,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  puestos: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia al modelo User
    required: true
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;