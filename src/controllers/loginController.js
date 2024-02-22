const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { jsonResponse } = require('./jsonResponse');
const { SECRET } = require('../config');
const Token = require('../models/token');

exports.authenticateUser = async (req, res) => {
    try {
        const { gmail, password } = req.body;
        const user = await User.findOne({ gmail });
        // const user = await User.findOne({ gmail }).populate('role');
        if (!user) {
            return res.status(404).json(jsonResponse(404, { error: 'Usuario no encontrado.' }));
        }
       
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json(jsonResponse(401, { error: 'Contraseña incorrecta.' }));
        }

        const token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: 3600000,
        });

        const TokenUser = new Token({ 
            token
        });

        const newToken = await TokenUser.save();
        console.log(newToken);
        const tokens = await Token.find();
        console.log("tttxxxxxxxxxxxxxxxxxxxxxx", tokens);

        // Agregar el rol del usuario a la respuesta JSON
        return res.json({ 
            token: token,
            user: user.role
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: 'Error al intentar iniciar sesión.' }));
    }
};

