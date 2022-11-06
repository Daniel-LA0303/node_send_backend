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