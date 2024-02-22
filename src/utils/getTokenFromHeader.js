function getTokenFromHeader(headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(" "); // Dividir por el espacio en blanco
        if (parted.length === 2) {
            return parted[1]; // Obtener el segundo elemento que contiene el token
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = { getTokenFromHeader };

