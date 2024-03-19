const express = require('express');
const postController = require('../controllers/postController');
const { isCliente ,isUsuario , verifyToken } = require('../middlewares/authJWt');
// const authenticate = require('../middlewares/authenticate');
const router = express.Router();




router.post("/" , postController.createPost);
router.get("/", postController.getAllPosts  );
router.put("/:id", postController.updatePost);
router.get("/:id", postController.getPostById);
router.delete("/:id",postController.deletePost);

module.exports = router;