const Post = require("../models/post");
const ParqueaderoExistente = require("../models/parqueaderoExistente");



async function createPost(req, res) {
  try {
   
    const userId = req.userId; 

    const { title, content, horarios, tarifaCarro, tarifaMoto, telefono, nosotros, latitud, longitud, puestos } = req.body;

    const existente = await ParqueaderoExistente.findOne({ latitud, longitud });
    if (!existente) {
      return res.status(400).json({ error: "No se encontró un parqueadero existente con estas coordenadas." });
    }

    const parqueaderoExistente = await Post.findOne({ title, content, telefono, latitud, longitud });
    if (parqueaderoExistente) {
      return res.status(400).json({ error: "Ya existe un parqueadero con estas coordenadas." });
    }

    const parqueadero = new Post({
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
      userId
    });

    await parqueadero.save();
    res.send(parqueadero);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
  }
}





// Controlador para obtener todos los posts
async function getAllPosts(req, res) {
  try {
    // Obtener todos los posts de la base de datos
    const posts = await Post.find();
    res.json(posts); // Responder con los posts obtenidos
  } catch (error) {
    console.error("Error obteniendo los posts:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Controlador para obtener un post por su ID
async function getPostById(req, res) {
  try {
    const postId = req.params.id;
    // Buscar el post por su ID en la base de datos
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post); // Responder con el post encontrado
  } catch (error) {
    console.error("Error obteniendo el post por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Controlador para actualizar un post por su ID
async function updatePost(req, res) {
  try {
    const postId = req.params.id;
    const { title, content, horarios, tarifaCarro, tarifaMoto, telefono, nosotros, latitud, longitud, puestos } = req.body;

    // Buscar y actualizar el post por su ID en la base de datos
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title,
      content,
      horarios,
      tarifaCarro,
      tarifaMoto,
      telefono,
      nosotros,
      latitud,
      longitud,
      puestos
    }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(updatedPost); // Responder con el post actualizado
  } catch (error) {
    console.error("Error actualizando el post por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Controlador para eliminar un post por su ID
async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    // Buscar y eliminar el post por su ID en la base de datos
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(deletedPost); // Responder con el post eliminado
  } catch (error) {
    console.error("Error eliminando el post por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};