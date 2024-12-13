import { body, check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { generarId } from '../Helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../Helpers/emails.js';
import pkg from 'nodemailer/lib/xoauth2/index.js';
const { errorMonitor } = pkg;

// Mostrar el formulario de login
const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    });
};

// Mostrar el formulario de registro
const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    });
};

// Registrar un nuevo usuario
const registrar = async (req, res) => {
    // Validaciones
    await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacío').run(req);
    await check('fecha').isISO8601().withMessage('La fecha de nacimiento debe ser válida').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('password').isLength({ min: 8 }).withMessage('La contraseña debe de ser mínimo 8 caracteres').run(req);
    await check('repeat_password').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    let resultado = validationResult(req);

    // Si hay errores, renderizar el formulario con los errores
    if (!resultado.isEmpty()) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
                fecha: req.body.fecha,
            }
        });
    }

    // Extraer los datos
    const { nombre, email, password, fecha } = req.body;

    // Verificar si el usuario ya existe
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario ya está registrado' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
                fecha: req.body.fecha,
            }
        });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        fecha,
        token: generarId()
    });

    // Enviar email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    // Confirmación de registro
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Se envió un correo de confirmación a tu correo, da clic en el enlace para confirmar.'
    });
};

// Confirmar cuenta del usuario
const confirmar = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        return res.render('auth/confirmar', {
            pagina: 'Error al confirmar cuenta',
            mensaje: 'Ups... Al parecer hubo un error al confirmar tu cuenta, inténtalo de nuevo',
            error: true
        });
    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = 1;
    await usuario.save();

    return res.render('auth/confirmar', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'Cuenta Confirmada Correctamente'
    });
};

// Mostrar formulario para recuperar la contraseña
const formularioPassword = (req, res) => {
    res.render('auth/password', {
        pagina: 'Recupera Tu Contraseña',
        csrfToken: req.csrfToken()
    });
};

// Restablecer la contraseña
const resetPassword = async (req, res) => {
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/password', {
            pagina: 'Recupera Tu Contraseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    // Buscar al usuario
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        return res.render('auth/password', {
            pagina: 'Recupera tu acceso a Bienes Raíces',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El Email no pertenece a ningún usuario' }]
        });
    }

    // Generar token y enviar email
    usuario.token = generarId();
    await usuario.save();

    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    });

    // Renderizar mensaje de éxito
    res.render('templates/mensaje', {
        pagina: 'Restablece tu contraseña',
        mensaje: 'Hemos enviado un email con las instrucciones'
    });
};

// Comprobar token para restablecer la contraseña
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        return res.render('auth/confirmar', {
            pagina: 'Restablece tu contraseña',
            mensaje: 'Hubo un error al cambiar tu contraseña, intenta de nuevo',
            error: true
        });
    }

    // Mostrar formulario para cambiar la contraseña
    res.render('auth/reset', {
        pagina: 'Restablece tu contraseña',
        csrfToken: req.csrfToken()
    });
};

// Cambiar la contraseña
const nuevaContrasena = async (req, res) => {
    // Validar la contraseña
    await check('password').isLength({ min: 8 }).withMessage('La contraseña debe de ser mínimo 8 caracteres').run(req);
    let resultado = validationResult(req);

    // Si hay errores, renderizar el formulario con los errores
    if (!resultado.isEmpty()) {
        return res.render('auth/reset', {
            pagina: 'Restablecer tu contraseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    const { token } = req.params;
    const { password } = req.body;

    // Identificar al usuario
    const usuario = await Usuario.findOne({ where: { token } });

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;
    await usuario.save();

    // Confirmar el cambio
    res.render('auth/confirmar', {
        pagina: 'Contraseña Actualizada',
        mensaje: 'Se cambió la contraseña correctamente'
    });
};

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioPassword,
    resetPassword,
    comprobarToken,
    nuevaContrasena
};
