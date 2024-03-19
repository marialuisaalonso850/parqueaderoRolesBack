const express = require('express'); // Importa Express
const router = express.Router();
const postUser = require('../controllers/loginController');

router.post('/', postUser);
// router.get('/', authController.getUserRole); // Nueva ruta para obtener el rol del usuario

module.exports = router;

//igual xs