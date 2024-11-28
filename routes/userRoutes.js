import express from "express";
<<<<<<< HEAD
import { formularioLogin,formularioRegistro,registrar,confirmar,formularioPassword } from "../Controllers/usuarioController.js";
=======
import { formularioLogin,formularioRegistro,formularioPassword } from "../Controllers/usuarioController.js";
>>>>>>> 9cfcfc021207d18e12e26799a634ed30b7b21ade

const router = express.Router();

router.get('/login',formularioLogin)
router.get('/registro',formularioRegistro)
<<<<<<< HEAD
router.post('/registro',registrar)
router.get('/confirmar/:token',confirmar)
=======
>>>>>>> 9cfcfc021207d18e12e26799a634ed30b7b21ade
router.get('/password',formularioPassword)

export default router