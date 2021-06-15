const extraeReceptores = async ( datosAnalizados ) => {

    let tabla = [];

    
    //aqui ahora nos llega esta estructura
    /*
    [
        {
            "usuario" : "@bernardoMontes",
            "tweet" : "No entiendo como pueden haber hecho esto los de @Cocacola",
            "predicción" : "0.2"
        },
        {
            "usuario" : "@saraSoni",
            "tweet" : "Me parece muy bien como los han tratado @UNICEF",
            "predicción" : "0.95"
        },
        {
            "usuario" : "@saraSoni",
            "tweet" : "Sin duda se merecen nuestra enhorabuena @ferguson",
            "predicción" : "0.89"
        },
        {
            "usuario" : "@RobertoLeal",
            "tweet" : "Me gusta mucho el plan de marketing de @Cocacola",
            "predicción" : "0.78"
        },
    ]*/


    /*datosAnalizados = datosAnalizados.replace(/'/g, '"');
    
    datosAnalizados = JSON.parse(datosAnalizados);*/



    //añadimos un campo receptores
    for ( let i = 0; i < datosAnalizados.length; i++){
        datosAnalizados[i]['receptores'] = [];
        var r = datosAnalizados[i]['texto'].split(" ").filter(function(n) {
            if(/@/.test(n)) return n;
        });
        for(let j = 0; j<r.length; j++){
            r[j] = r[j].split('@')[1].toLowerCase();
        }
        datosAnalizados[i]['receptores'] = r;
    }

    for ( let i = 0; i < datosAnalizados.length; i++){

        for(let j = 0; j < datosAnalizados[i]['receptores'].length; j++){
            var spawn = require("child_process").spawn;
            var processAnalyzer = spawn('python', ["helpers/obtenerFotoUsuTwitter.py", datosAnalizados[i]['receptores'][j]]);
            for await (const chunk2 of processAnalyzer.stdout) {
                datosAnalizados[i]['receptores'][j] += " " + chunk2.toString();
            }
        }
    }


    //console.log(datosAnalizados);
    

    return datosAnalizados;

}

module.exports = {extraeReceptores} 