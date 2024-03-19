jsonResponse = function( statusCode, body){
    console.log("Generando respuesta JSON con statusCode:", statusCode, "y body:", body);
    return {
        statusCode,
        body
    };
} 

module.exports={jsonResponse}