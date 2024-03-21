const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
const { jsonResponse } = require('./jsonResponse');
const { SECRET } = require('../config')
const sendConfirmationEmail = require('../routes/correos');

exports.createUser = async (req, res) => {
    try {
        const { gmail, username, password, role } = req.body;

        const gmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!gmailRegex.test(gmail)) {
            return res.status(400).json(jsonResponse(400, { error: 'El correo válido.' }));
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json(jsonResponse(400, { error: 'La contraseña debe tener al menos 8 caracteres, un número y una mayúscula.' }));
        }

        const exists = await User.findOne({ gmail });
        if (exists) {
            return res.status(400).json(jsonResponse(400, { error: 'El nombre de usuario ya existe.' }));
        }

        const newUser = new User({ 
            gmail, 
            username, 
            password, 
            role,
        });

        const savedUser = await newUser.save();
        sendConfirmationEmail(gmail);

        const token = jwt.sign({ savedUser }, SECRET, {
            expiresIn: 86400000,
        });

        return res.status(200).json({ token, message: 'Usuario creado.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: 'Error al crear un usuario.' }));
    }
};