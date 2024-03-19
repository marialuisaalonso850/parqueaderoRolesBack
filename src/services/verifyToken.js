const jwt = require("jsonwebtoken");


function verifyAccessToken(Token) {
    console.log("asvas"+Token);
    try {
        return jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        // Manejar errores de verificación del token aquí
        throw new Error("Token de acceso inválido");
    }
}

function verifyRefreshToken(Token) {
    try {
        return jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        // Manejar errores de verificación del token aquí
        throw new Error("Token de actualización inválido");
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
