const express = require('express');
const conectarDB = require('./config/db');

//1.crear servidor
const app = express();

//5. Conectar a la Db
conectarDB();

//2.puerto de la app
const port = process.env.PORT || 4000;

//10. habilitar leer los valores de un body
app.use(express.json());

//rutas de la app
//6.
app.use('/api/usuarios', require('./routes/usuarios'));

//3.arrancar la app
app.listen(port,'0.0.0.0', () => {
    console.log(`EL servidor esta funcionando en el puerto ${port}`);
})