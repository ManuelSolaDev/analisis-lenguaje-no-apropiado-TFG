/*
Importación de módulos
*/
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { dbConnection } = require('./database/configdb');

// Crear una aplicación de express
const app = express();

dbConnection();

app.use(cors());  
//para poder leer los bodys de las request como jsons req.body.terminos <-- nos permite hacer eso
app.use(express.json());

app.use('/api/consultas', require('./routes/consultas'));


// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});
