const Consulta = require('../models/consultas');
const { validationResult } = require('express-validator');
const validator = require('validator');
const { extraeReceptores } = require('../helpers/extraeReceptores');


const getConsultas = async(req, res) => {
    const id = req.query.id;
    let consultas;

    if (id) {
        if (!validator.isMongoId(id)) {
            return res.json({
                ok: false,
                msg: 'El id de la categoria debe ser válido'
            });
        }

        [consultas] = await Promise.all([
            Consulta.findById(id),
        ]);

    }else{ //si no hay id
        [consultas] = await Promise.all([
            Consulta.find({}),
        ]);
    }
    res.json({
        ok: true,
        msg: 'getConsultas',
        consultas

    });
}

async function lanzarConsulta(datos){

    let tweets = '';
    let datosAnalizados = '';

    var spawn = require("child_process").spawn;
    console.log("datos['terminos']");
    console.log(datos['terminos']);

    console.log("datos['fechaDesde']");
    console.log(datos['fechaDesde']);

    console.log("datos['fechaHasta']");
    console.log(datos['fechaHasta']);

    let queryTerms = "";
    for(let i = 0; i<datos['terminos'].length; i++){
        queryTerms+=datos['terminos'][i];
        if(i<datos['terminos'].length-1){
            queryTerms+="+";
        }
    }

    console.log("queryTerms");
    console.log(queryTerms);
    //Lo llamamos pasandole los terminos que queremos usar para recolectar la data y analizarla
    var process = spawn('python', ["listeners/listenerTwitter.py", queryTerms, datos['fechaDesde'], datos['fechaHasta']]);

    for await (const chunk1 of process.stdout) {
        tweets += chunk1;
        //console.log('stdout chunk listener: '+chunk1);
    }

    //adaptamos el formato para poder parsearlo
    tweets= tweets.replace(/\{\"\'/g, '{"');
    tweets= tweets.replace(/\'\ \:/g, '" :');
    tweets= tweets.replace(/\:\ \'/g, ': "');
    tweets= tweets.replace(/\'\"\,/g, '",');
    tweets= tweets.replace(/\,\ \"\'/g, ', "');
    tweets= tweets.replace(/\'\"\}/g, '"},');


    //quitamos el salto de linea y la ,
    tweets = tweets.substring(0, tweets.length - 3);

    tweets = '[' + tweets + ']';
    console.log("teets antes de parsear");
    console.log(tweets);
    tweets = JSON.parse(tweets);

    for( let i=0; i< tweets.length; i++){
        console.log("entra: " + i);
        var processAnalyzer = spawn('python', ["analyzers/analyzer.py", tweets[i]['texto']]);
        for await (const chunk2 of processAnalyzer.stdout) {
            console.log("prediccion: " + chunk2.toString())
            tweets[i]['prediccion'] = chunk2.toString();
        }
        
    }

    

    let datosAnalizadosEstructurados = await extraeReceptores(tweets);

    return datosAnalizadosEstructurados;
    

    


}

const crearConsulta = async(req, res) => {

    let resultado = lanzarConsulta(req.body);
    //cuando se han recopilado de la api y terminado de analizar los tweets
    resultado.then( async res => {
        //save
        consulta.estado = 'terminado';
        consulta.resultado = res;
        await consulta.save();
        //añadimos a la consulta el resultado o creamos otro objeto de tipo resultado
    });
    //console.log('Despues de lanzarConsulta()');
    const consulta = new Consulta(req.body);
    await consulta.save();
    
    res.json({
        ok: true,
        msg: 'crearConsulta',
        consulta

    });
}

module.exports = { getConsultas, crearConsulta }