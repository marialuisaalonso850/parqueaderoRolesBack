const jwt = require("jsonwebtoken");
const { SECRET } = require("../config.js");
const User = require("../models/user.js");

verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const isUsuario = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role === "usuario") {
      next();
    } else {
      return res.status(403).json({ message: "Require usuario Role!" });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const isCliente = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "cliente") {
      next();
    } else {
      return res.status(403).json({ message: "Require Cliente Role!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

module.exports = { isCliente, isUsuario,verifyToken };