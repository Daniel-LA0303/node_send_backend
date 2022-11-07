const express = require('express');
const router = express.Router();
const enlacesController = require('../controllers/enlacesController');
const archivosController = require('../controllers/archivosController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//26
router.post('/', 
    [ //33
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmail(),
    ],
    auth,
    enlacesController.nuevoEnlace
);


router.get('/',
    enlacesController.todosEnlaces
)

//45
router.get('/:url',
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace,
);

router.post('/:url', 
    enlacesController.verificarPassword, 
    enlacesController.obtenerEnlace
);

module.exports = router;