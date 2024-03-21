const jwt = require("jsonwebtoken");

function verifyAccessToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        // Manejar errores de verificación del token aquí
        console.error("Error al verificar el token de acceso:", error.message);
        if (error.name === 'TokenExpiredError') {
            throw new Error("Token de acceso expirado");
        } else {
            throw new Error("Token de acceso inválido");
        }
    }
}

function verifyRefreshToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        // Manejar errores de verificación del token aquí
        console.error("Error al verificar el token de actualización:", error.message);
        throw new Error("Token de actualización inválido");
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
