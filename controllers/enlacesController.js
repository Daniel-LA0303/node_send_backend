const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');


//27
exports.nuevoEnlace = async (req, res, next) => {

    //32 Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //30 crear el objeto de enlace    
    const {nombre_original} = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    //reenombrando el nombre del archivo y generar el nombre unico
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;

    //31 si el usuario esta autenticado
    // console.log(req.usuario);
    if(req.usuario){
        const {password, descargas} = req.body
        //asignar a enlace el nuemero de descargas
        if(descargas){
            enlace.descargas = descargas;
        }
        //asignar un password
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }
        //asignar el autor 
        enlace.autor = req.usuario.id
    }


    //almacenar en la DB
    try {
        await enlace.save();
        return res.json({msg : `${enlace.url}`});
    } catch (error) {
        console.log(error);
    }



}