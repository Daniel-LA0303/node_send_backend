const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosController');
const auth = require('../middleware/auth');

//35
router.post('/', 
    auth,
    archivosController.subirArchivos
);

router.get('/:archivo',
    archivosController.descargar,
    archivosController.eliminarArchivos
)

// //36
// router.delete('/:id',
//     archivosController.eliminarArchivos
// );



module.exports = router;