// Ejemplo de activación de HOT REALD
// console.log("Hola desde Node.JS")

//const express = require('express'); // Aquí es "require" en lugar de "requiere"
// Importar la librería para crear un servidor web - CommonJS / ECHA script
// Insertar nuestra aplicación web 

import express from "express";
const app = express();

const port = 3000;

app.listen(port, ()=>{
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);
});

app.get("/", function(req, res){
    res.send("Hola desde la web, en NodeJS");
});

app.get("/quieneres", function(req, res){
    res.json(
        {
            "nombre" :"Jonathan",
            "carrera":"ti dsm",
            "grado":"4",
            "grupo":"A"
        }
    )
})
// Configura el puerto por donde va a pasar el servidor

// ¿Qué es una clase?
// ¿Qué es una instancia?
//Nose