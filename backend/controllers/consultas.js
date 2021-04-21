const Consulta = require('../models/consultas');
const { validationResult } = require('express-validator');

const getConsultas = async(req, res) => {
    const consultas = await Consulta.find({});
    res.json({
        ok: true,
        msg: 'getConsultas',
        consultas

    });
}

const crearConsulta = async(req, res) => {

    const consulta = new Consulta(req.body);
    await consulta.save();
    
    /*
        return res.status(400).json({
            ok: false,
            msg: 'Texto error'
        });
    */
    res.json({
        ok: true,
        msg: 'crearConsulta',
        consulta

    });
}

module.exports = { getConsultas, crearConsulta }