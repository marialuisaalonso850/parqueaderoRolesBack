// authenticate.mjs

const { jsonResponse } = require("../controllers/jsonResponse");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyAccessToken } = require("../services/verifyToken");

function authenticate(req, res, next) {
    const Token = getTokenFromHeader(req.headers);

    console.log("Token:", Token);

    if (Token) {
        const decoded = verifyAccessToken(Token);
        if (decoded) {
            req.userId = decoded.user.id; // <-- Cambiar esto
            console.log("User ID:", decoded.user.id);
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
