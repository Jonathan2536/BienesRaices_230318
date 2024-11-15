import express from "express";
import { formularioLogin,formularioRegistro,formularioPassword } from "../Controllers/usuarioController.js";

const router = express.Router();

router.get('/login',formularioLogin)
router.get('/registro',formularioRegistro)
router.get('/password',formularioPassword)

export default router