/*
    ruta base: /api/consultas
*/


const { Router } = require('express');
const { getConsultas, crearConsulta } = require('../controllers/consultas');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');



const router = Router();


router.get('/' , getConsultas);
router.post('/', [

    check('terminos', 'El argumento terminos es obligatorio').not().isEmpty(),
    check('fechaDesde', 'El argumento fechaDesde es obligatorio').not().isEmpty(),
    check('fechaHasta', 'El argumento fechaHasta es obligatorio').not().isEmpty(),
    check('fechaDesde', 'El argumento fechaDesde debe ser una fecha').isDate(),
    check('fechaHasta', 'El argumento fechaHasta debe ser una fecha').isDate(),
    validarCampos
],  crearConsulta);


module.exports = router;