import express from "express";
import { formularioLogin,formularioRegistro,registrar,confirmar,formularioPassword,resetPassword ,comprobarToken,nuevaContrasena} from "../Controllers/usuarioController.js";

const router = express.Router();

router.get('/login',formularioLogin)
router.get('/registro',formularioRegistro)
router.post('/registro',registrar)
router.get('/confirmar/:token',confirmar)
router.get('/password',formularioPassword)
router.post('/password',resetPassword)
//Almacena la nueva contraseña
router.get('/password/:token', comprobarToken);
router.post('/password/:token', nuevaContrasena);


 
export default router