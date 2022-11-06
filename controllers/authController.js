const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const {validationResult} = require('express-validator');

//18
exports.autenticarUsuario = async (req, res, next) => {
    
    //revisar si hay errores de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }


    // 19 buscar el usuario para ver so esta registrado
    console.log(req.body);
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if(!usuario){
        res.status(401).json({msg : 'El usuario no existe'});
        return next();
    }

    //20 vericar el password y autenticar el usuario
    if(bcrypt.compareSync(password, usuario.password)){
        // 21 crear JWT
        const token = jwt.sign({
            //almacenmos en el JWT los siguiebntes datos
            nombre: usuario.nombre,
            email: usuario.email,
            id : usuario._id
        }, process.env.SECRETA, { //palabra secreta esta en variables.env
            expiresIn: '200h'
        });
        res.json({token});
        // console.log(token);
        // console.log('el password es correcto');

    }else{
        res.status(401).json({msg: "Password Incorrecto"})
        return next();
    }

}


exports.usuarioAutenticado = (req, res, next) => {

    res.json({usuario: req.usuario});
}