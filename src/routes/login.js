const express = require('express'); // Importa Express
const router = express.Router();
const authController = require('../controllers/loginController');

router.post('/', authController.authenticateUser);
router.get('/', authController.getUserRole); // Nueva ruta para obtener el rol del usuario

module.exports = router;
