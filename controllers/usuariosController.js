const Usuario = require('../models/Usuarios');

const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');

exports.nuevoUsuarios = async (req, res) => {
    
    
    console.log('desde usuarios');
    // console.log(req.body)
    
    //15 mosotrar mensajes de error de express validatror
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //12. verficar si el usuario ya esta regsitrado
    const{email, password} = req.body;
    let usuario = await Usuario.findOne({email});
    if(usuario){
        return res.status(400).json({msg: 'El usuario ya esta registrado'});
    }
    
    // // //11. crear nuevo usuario
    usuario = await new Usuario(req.body);
    // //13 hasea el password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);


    

    try {
        //11
       await usuario.save();
        res.json({msg : 'Usuario creado correcatemente'});
    } catch (error) {
        console.log(error);
    }

}