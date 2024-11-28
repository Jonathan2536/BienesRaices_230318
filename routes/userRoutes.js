import express from "express";
import { formularioLogin,formularioRegistro,registrar,confirmar,formularioPassword } from "../Controllers/usuarioController.js";

const router = express.Router();

router.get('/login',formularioLogin)
router.get('/registro',formularioRegistro)
router.post('/registro',registrar)
router.get('/confirmar/:token',confirmar)
router.get('/password',formularioPassword)

export default router