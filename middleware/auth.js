const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = (req, res, next) => {

    //23 
    //obteniendo los headers
    const auhtHeader = req.get('Authorization')

    if(auhtHeader){
        //obteniendo el token
        const token = auhtHeader.split(' ')[1];

        try {
            //comprobando el JWT
            const usuario = jwt.verify(token, process.env.SECRETA); //se extraen los datos el jwt
            req.usuario = usuario; //retornamos el usuario como json
        } catch (error) {
            console.log(error);
            console.log('jwt no valido');
        }
    }
    return next();
}