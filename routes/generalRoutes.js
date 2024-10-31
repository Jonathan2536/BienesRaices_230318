import express from 'express';
const router = express.Router();

//Routing, enrrutamineto para peticiones 

router.get("/", function(req,res){
res.send("Hola desde desde la web, en Node.js")
})

router.get("/quieneres", function(req,res){
res.json(
    {
        "nombre":"Jonathan Emmanuel López Morales",
        "carrera": "TIADSM",
        "Grado":"4",
        "grupo":"A"
    }
)
})


export default router; 
//esta palabra reservadade JS me permite exportar a los elementos