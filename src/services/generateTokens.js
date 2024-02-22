const jwt = require("jsonwebtoken");
require('dotenv').config();

function sign(payload, secretKey, expiresIn) {
    try {
        return jwt.sign(payload, secretKey, {
            algorithm: "HS256",
            expiresIn: expiresIn
        });
    } catch (error) {
        console.error("Error al firmar el token:", error.message);
        return null;
    }
}

function generateAccessToken(user) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
        console.error("Error: ACCESS_TOKEN_SECRET no definido en las variables de entorno.");
        return null;
    }
    return sign({ user }, accessTokenSecret, "1h");
}

function generateRefreshToken(user) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) {
        console.error("Error: REFRESH_TOKEN_SECRET no definido en las variables de entorno.");
        return null;
    }
    return sign({ user }, refreshTokenSecret, "7d");
}

module.exports = { generateAccessToken, generateRefreshToken };
