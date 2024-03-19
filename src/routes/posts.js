const express = require('express');
const postController = require('../controllers/postController');
const { verifyToken, isUsuario, isCliente } = require('../middlewares/authJWt'); // Importa tus middlewares
const router = express.Router();

// Rutas para usuarios
router.post("/", verifyToken, isUsuario, postController.createPost);
router.get("/", verifyToken, isUsuario, postController.getAllPosts);
router.put("/:id", verifyToken, isUsuario, postController.updatePost);
router.get("/:id", verifyToken, isUsuario, postController.getPostById);
router.delete("/:id", verifyToken, isUsuario, postController.deletePost);

// Rutas para clientes
router.post("/cliente", verifyToken, isCliente, postController.createPost);
router.get("/cliente", verifyToken, isCliente, postController.getAllPosts);
router.put("/cliente/:id", verifyToken, isCliente, postController.updatePost);
router.get("/cliente/:id", verifyToken, isCliente, postController.getPostById);
router.delete("/cliente/:id", verifyToken, isCliente, postController.deletePost);

module.exports = router;
