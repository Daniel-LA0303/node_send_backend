//39 subida de archivos
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const { log } = require('console');
const Enlaces = require('../models/Enlace');



//37
exports.subirArchivos = async (req, res, next) => {
    const configuracionMulter = { //1000000 = 1MB
        limits : {flieSize: req.usuario ? 1024 * 1024 * 10 : 1024*1024}, //43 validando si esta autenticado
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                // const extension = file.mimetype.split('/')[1];
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            }
        })
    }
    const upload = multer(configuracionMulter).single('archivo'); //40
    //42 sube el archivo
    upload(req, res, async (error) => {
        console.log(req.file);

        if(!error){
            res.json({archivo: req.file.filename});
        }else{
            console.log(error);
            return next();
        }
    })

}

//38
exports.eliminarArchivos = async (req, res) => {
    console.log(req.archivo);
    //50 eliminando
    try {
        fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`);
        console.log('archivo eliminado');
    } catch (error) {
        console.log(error);
    }
}



//descarga un archivo
exports.descargar = async (req, res, next) => {


    //obtiene el enlace 
    const enlace = await Enlaces.findOne({
        nombre: req.params.archivo
    })


    // console.log('..descargando');
    const archivo = __dirname + '/../uploads/' + req.params.archivo;
    //definir content 
    res.download(archivo); //para descargar el archivo


    //eliminar el archivo ya la entrada de lka db
    
    //47 si las descargas son iguales a 1 -Borrar la entrada y borrar el archivo
    const {descargas, nombre} = enlace;
    if(descargas === 1){
        // console.log('solo hay una descarga');

        //eliminar el archivo
        req.archivo = nombre; //obtenemos el nombre

        //eliminar la  entrada de la db
        await Enlaces.findOneAndDelete(enlace.id); //el enalce se elimina de la db

        next(); //cuando llega a esta parte salta a la ortra funcio n que es eliminarArchivos
    }else{
        //48 si las descargas son > a 1 - Restar 1
        enlace.descargas--;
        await enlace.save();
        // console.log('Aun hay descargas');
    }

    console.log(enlace);
}