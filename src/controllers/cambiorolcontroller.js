const User = require('../models/user');
const Role = require('../models/role');
const { jsonResponse } = require('./jsonResponse');

exports.changeRoleToCliente = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(jsonResponse(404, { error: 'Usuario no encontrado.' }));
        }

        let clienteRole = await Role.findOne({ name: "cliente" });
        if (!clienteRole) {
            clienteRole = await Role.create({ name: "cliente" });
        }

        user.rol = [clienteRole._id];
        await user.save();

        return res.status(200).json(jsonResponse(200, { message: 'Rol cambiado a cliente.' }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: 'Error al cambiar el rol.' }));
    }
};
