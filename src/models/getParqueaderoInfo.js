function getUserParqueadero(post){
    return{
        title: post.title,
        content: post.content,
        longitud: post.longitud,
        latitud:post.latitud,
        puestos:post.puestos
    };
};

module.exports = {
    getUserParqueadero
};