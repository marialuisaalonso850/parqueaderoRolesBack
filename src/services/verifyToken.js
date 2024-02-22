const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyAccessToken(token) {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("Access token secret not defined");
        }
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.error("Error verifying access token:", error.message);
        return null; // or throw an exception according to your needs
    }
}

function verifyRefreshToken(token) {
    try {
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("Refresh token secret not defined");
        }
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.error("Error verifying refresh token:", error.message);
        return null;
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
