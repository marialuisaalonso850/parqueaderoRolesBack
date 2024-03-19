const Parqueadero = require("../models/post");
const ParqueaderoExistente = require("../models/parqueaderoExistente");

async function createPost(req, res) {
  try {
    console.log("sssss", userid);
    // const userId = req.userId; // ID del usuario autenticado

    const { title, content, horarios, tarifaCarro, tarifaMoto, telefono, nosotros, latitud, longitud, puestos } = req.body;

    const existente = await ParqueaderoExistente.findOne({ latitud, longitud });
    if (!existente) {
      return res.status(400).json({ error: "No se encontró un parqueadero existente con estas coordenadas." });
    }

    const parqueaderoExistente = await Parqueadero.findOne({ title, content, telefono, latitud, longitud });
    if (parqueaderoExistente) {
      return res.status(400).json({ error: "Ya existe un parqueadero con estas coordenadas." });
    }

    const parqueadero = new Parqueadero({
      title,
      content,
      horarios,
      tarifaCarro,
      tarifaMoto,
      telefono,
      nosotros,
      latitud,
      longitud,
      puestos,
      // userId: userId 
    });

    await parqueadero.save();
    res.send(parqueadero);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Parqueadero.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updatePost(req, res) {
  try {
    const post = await Parqueadero.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        horarios: req.body.horarios,
        tarifaCarro: req.body.tarifaCarro,
        tarifaMoto: req.body.tarifaMoto,
        telefono: req.body.telefono,
        nosotros: req.body.nosotros,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        puestos: req.body.puestos,
      },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPostById(req, res) {
  try {
    const post = await Parqueadero.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.userId; // ID del usuario autenticado

    // Buscar el parqueadero por su ID
    const post = await Parqueadero.findById(postId);
    if (!post) {
      return res.status(404).send("Parqueadero no encontrado");
    }

    // Verificar si el usuario actual es el propietario del parqueadero
    if (post.userId !== userId) {
      return res.status(403).send("No tienes permiso para eliminar este parqueadero");
    }

    // Eliminar el parqueadero
    const deletedPost = await Parqueadero.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send("No se pudo eliminar el parqueadero");
    }

    res.send(deletedPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  getPostById,
  deletePost
};
