const jwt = require('jsonwebtoken'); 
const Token = require('../models/token');

async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.body;
    
        if (!refreshToken) {
            return res.status(401).json({ error: 'Unauthorized - Refresh token not provided' });
        }

        const foundToken = await Token.findOne({ token: refreshToken });
    
        if (!foundToken) {
            return res.status(401).json({ error: 'Unauthorized - Refresh token not found' });
        }
    
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized - Invalid refresh token' });
            }
    
            // Aquí puedes extraer la ID del usuario del token decodificado
            const userId = user.user.id;
    
            // Lógica para generar un nuevo token de acceso usando la ID del usuario
            // Por ejemplo:
            const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400000 });
    
            res.json({ accessToken: accessToken });
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    refreshToken
};
