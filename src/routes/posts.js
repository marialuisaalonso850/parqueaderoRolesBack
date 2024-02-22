const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const  { isCliente, isUsuario ,verifyToken} = require("../middlewares/authJWt");

router.post("/",isCliente, postController.createPost);
router.get("/", postController.getAllPosts  );
router.put("/:id",[verifyToken, isCliente ], postController.updatePost);
router.get("/:id", postController.getPostById);
router.delete("/:id", [verifyToken, isCliente ],postController.deletePost);

module.exports = router;