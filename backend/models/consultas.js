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

//estamos sobreescribiendo este metodo que se llama al devolver en el post o en el get la consulta y es para cambiarle el nombre al id
/*ConsultaSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})*/

module.exports = model('Consulta', ConsultaSchema);