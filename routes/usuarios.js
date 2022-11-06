const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const {check} = require('express-validator');

//7
router.post('/',
    [ //14 validacion con express validator
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email debe ser valido').isEmail(),
        check('password', 'El password es obligatorio y debe ser de al menos 6 caracteres').isLength({min: 6})
    ],
    usuariosController.nuevoUsuarios
);

module.exports = router;