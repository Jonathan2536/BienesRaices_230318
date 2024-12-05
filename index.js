import express from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/userRoutes.js'
import db from './Config/db.js'
//Crear la app
const app = express();

//Habilitar lectura de datos del formulario
app.use(express.urlencoded({extended:true}))

//Habilitar cookie-parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csurf({cookie:true}))

//Routing
app.use('/auth',usuarioRoutes)

//Conexion a la bd
try{
    await db.authenticate();
    db.sync()
    console.log('Conexion Correcta a la Base de datos')
}catch(error){
    console.log(error)
}

//Habilitar pug
app.set('view engine','pug')
app.set('Views','/.Views')

//Carpeta Publica
app.use(express.static('Public'))

// Definir un puerto y arrancar el proyecto
const port =process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`La aplicación se ha iniciado en el puerto ${port}`);
});



