const express = require('express');
const router = express.Router();
const userController = require('../controllers/cambiorolcontroller');

router.post('/', userController.changeRoleToCliente);

module.exports = router;