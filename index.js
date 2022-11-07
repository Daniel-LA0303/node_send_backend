const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')

//1.crear servidor
const app = express();

//5. Conectar a la Db
conectarDB();

//51 Habilitar cors
const opcionesCors={
    origin: process.env.FRONTEND_URL
}
app.use(cors());

//2.puerto de la app
const port = process.env.PORT || 4000;

//10. habilitar leer los valores de un body
app.use(express.json());

//HABILITAR LA CARPETA PUBLICA
app.use(express.static('uploads'));

//rutas de la app
//6.
app.use('/api/usuarios', require('./routes/usuarios'));
//16
app.use('/api/auth', require('./routes/auth'));
//25
app.use('/api/enlaces', require('./routes/enlaces'));
//34
app.use('/api/archivos', require('./routes/archivos'));


//3.arrancar la app
app.listen(port,'0.0.0.0', () => {
    console.log(`EL servidor esta funcionando en el puerto ${port}`);
})