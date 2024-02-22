const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { username, gmail, password, role } = req.body;

    const user = new User({
      username,
      gmail,
      password,
      role: role || 'cliente', // Si no se proporciona el rol, se establece como 'cliente' por defecto
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

    return res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createUser,
};
