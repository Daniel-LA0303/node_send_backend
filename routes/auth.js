const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//17
router.post('/', 
    check('email', 'Agrega un Email valido').isEmail(),
    check('password', 'El password no debe estar vacio').not().isEmpty(),
    authController.autenticarUsuario);

router.get('/', 
    auth,
    authController.usuarioAutenticado);

module.exports = router;