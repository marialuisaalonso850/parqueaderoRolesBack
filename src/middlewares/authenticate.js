// authenticate.mjs

const { jsonResponse } = require("../controllers/jsonResponse");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyAccessToken } = require("../services/verifyToken");

function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);

    console.log("Token:", token);

    if (token) {
        const decoded = verifyAccessToken(token);
        if (decoded) {
            req.userId = decoded.user.id; // Agregar el ID de usuario a la solicitud
            console.log("User ID:", decoded.user.id);
            userid = decoded.user.id;
            next();
        } else {
            return res.status(401).json(jsonResponse(401, {
                message: "Token inválido o expirado"
            }));
        }
    } else {
        return res.status(401).json(jsonResponse(401, {
            message: "Token no proporcionado en el encabezado de autorización"
        }));
    }
}

module.exports = { authenticate };
