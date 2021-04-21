const { Schema, model } = require('mongoose');

const ConsultaSchema = Schema({
    terminos: [{
        type: String,
        required: true
    }],
    fechaDesde: {
        type: Date,
        required: true
    },
    fechaHasta: {
        type: Date,
        required: true
    }
}, { collection: 'consultas' });

module.exports = model('Consulta', ConsultaSchema);