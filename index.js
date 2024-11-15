// Ejemplo de activación de HOT REALD
// console.log("Hola desde Node.JS")

//const express = require('express'); // Aquí es "require" en lugar de "requiere"
// Importar la librería para crear un servidor web - CommonJS / ECHA script
// Insertar nuestra aplicación web 

import express from 'express';
import usuarioRoutes from './routes/userRoutes.js'

//Crear la app
const app = express();

//Routing
app.use('/auth',usuarioRoutes)

//Habilitar pug
app.set('view engine','pug')
app.set('Views','/.Views')

//Carpeta Publica
app.use(express.static('Public'))

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`La aplicación se ha iniciado en el puerto ${port}`);
});

// Configura el puerto por donde va a pasar el servidor

// ¿Qué es una clase?
// ¿Qué es una instancia?
//Nose