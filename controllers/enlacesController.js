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
    const {nombre_original, nombre} = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    //reenombrando el nombre del archivo y generar el nombre unico
    enlace.nombre = nombre;
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

//44 obtener enlaces
exports.obtenerEnlace = async (req, res, next) => {
    //46
    //verificar si exite el enalce
    const {url} = req.params
    const enlace = await Enlaces.findOne({url})

    if(!enlace){
        res.status(401).json({msg: 'Ese enlace no existe'});

        return next();
    }

    //si el enlace existe
    res.json({archivo: enlace.nombre, password: false});
    // res.download({archivo: enlace.nombre});

    next()


    // //47 si las descargas son iguales a 1 -Borrar la entrada y borrar el archivo
    // const {descargas, nombre} = enlace;
    // if(descargas === 1){
    //     console.log('solo hay una descarga');

    //     //eliminar el archivo
    //     req.archivo = nombre; //obtenemos el nombre

    //     //eliminar la  entrada de la db
    //     await Enlaces.findOneAndDelete(req.params.url);

    //     next(); //cuando llega a esta parte salta a la ortra funcio n que es eliminarArchivos
    // }else{
    //     //48 si las descargas son > a 1 - Restar 1
    //     enlace.descargas--;
    //     await enlace.save();
    //     console.log('Aun hay descargas');
    // }

}

//lista todos llos enlacese
exports.todosEnlaces = async(req, res) => {

    try {
        const enlaces = await Enlaces.find({}).select('url -_id');
        res.json({enlaces});
    } catch (error) {
        console.log(error);
    }
}

//retorna si el enlace tiene password o  no
exports.tienePassword = async(req, res, next) => {
    //verificar si exite el enalce
    const {url} = req.params
    const enlace = await Enlaces.findOne({url})

    if(!enlace){
        res.status(401).json({msg: 'Ese enlace no existe'});

        return next();
    }
    if(enlace.password){
        return res.json({ password: true, enlace: enlace.url});
    }

    next();
}

//verifica si el password es correcto
exports.verificarPassword = async (req, res, next) => {
    const {url} = req.params;
    const {password} = req.body;
    console.log(url, password);
    //consulta por el enlace
    const enlace = await Enlaces.findOne({url});
    console.log(enlace);
    // //verificar el password
    if(bcrypt.compareSync(password, enlace.password)){
        //permitir la descarga
        next();
    }else{
        return res.status(401).json({ msg: 'Password Incorrecto'});
    }

    

}
