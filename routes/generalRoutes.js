
import express from "express";
const router = express.Router(); // Cambié a 'router' para evitar conflictos

router.get("/", function(req, res) {
    res.send("Hola desde la web, en NodeJS");
});

router.get("/quieneres", function(req, res) { // Cambié el nombre de la ruta a 'quien-eres' para evitar espacios
    res.json({
        "nombre": "Jonathan",
        "carrera": "ti dsm",
        "grado": "4",
        "grupo": "A"
    });
});

export default router; 
//esta palabra reservadade JS me permite exportar a los elementos
