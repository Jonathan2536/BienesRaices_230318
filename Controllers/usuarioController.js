import { body, check ,checkExact,validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from '../Models/Usuario.js'
import {generarJWT,generarId} from '../Helpers/tokens.js'
import {emailRegistro , emailOlvidePassword} from '../Helpers/emails.js'
import { where } from 'sequelize'
import pkg from 'nodemailer/lib/xoauth2/index.js';
const { errorMonitor } = pkg;

const formularioLogin = (req,res) => {
    res.render('auth/login',{
         pagina : 'IniciarSesión',
         csrfToken : req.csrfToken()
    })
}
const autenticar = async (req, res) => {
    //Validacion
    await check('email').isEmail().withMessage('El email es un campo obligatorio ').run(req)
    await check('password').notEmpty().withMessage('La contraseña es un campo obligatorio').run(req)

    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/login',{
            pagina : 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre : req.body.nombre,
                email : req.body.email,
                fecha: req.body.fecha,
            }               
        })
    }

   
    const  { email , password } = req.body
     //Comprobar si el usuario existe
     const usuario = await Usuario.findOne({where: {email}})
     if(!usuario){
        return res.render('auth/login',{
            pagina : 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores : [{msg: 'El Usuario No Existe'}]
        })
     }
     //Comprobar si el usuario esta confirmado
     if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina : 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores : [{msg: 'Tu cuenta no ha sido Confirmada'}]
        })
     }
     //Revisar la contraseña
     if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina : 'Iniciar Sesion',
            csrfToken : req.csrfToken(),
            errores : [{msg: 'La Contraseña es Incorrecta'}]
        })
     }
     //Autenticar el usuario
     const token = generarJWT({id:usuario.id,nombre:usuario.nombre})
     
     console.log(token)

     //Almacenar en un cookie
     return res.cookie('_token',token,{
        httpOnly: true,
        secure:true,
        sameSite:true
     }).redirect('/mis-propiedades')
}

const formularioRegistro = (req,res) => {

    res.render('auth/registro',{
        pagina : 'Crear Cuenta',
        csrfToken : req.csrfToken()
    })
}
const registrar = async (req,res) => {
    
        //Validacion 
        await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
        await check('fecha').isISO8601().withMessage('La fecha de nacimiento debe ser válida').run(req)
        await check('email').isEmail().withMessage('Eso no parece un email ').run(req)
        await check('password').isLength({min:8}).withMessage('La contraseña debe de ser minimo 8 caracteres').run(req)
        await check('repeat_password').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden').run(req)

        
        let resultado = validationResult(req)
    
        //Verificar que el resulatado este vacio
        if(!resultado.isEmpty()){
            //Errores
            return res.render('auth/registro',{
                pagina : 'Crear Cuenta',
                csrfToken : req.csrfToken(),
                errores: resultado.array(),
                usuario: {
                    nombre : req.body.nombre,
                    email : req.body.email,
                    fecha: req.body.fecha,
                }               
            })
        }
        //Comprobar si el usuario exsite

        //Extraer los datos
        const {nombre,email,password,fecha} = req.body

        //Verificar que el usuario no este duplicado
         const existeUsuario = await Usuario.findOne({where : {email}})
        console.log('Usuario Existente')
        if(existeUsuario){            
            return res.render('auth/registro',{
                pagina : 'Crear Cuenta',
                csrfToken : req.csrfToken(),
                errores: [{msg : 'El usuario ya esta registrado'}],
                usuario: {
                    nombre : req.body.nombre,
                    email : req.body.email,
                    fecha: req.body.fecha,
                }               
            })

        }
        //Almacenar un usuario
       const  usuario = await Usuario.create({
            nombre,
            email,
            password,
            fecha,
            token : generarId()
        })
        
        // Enviar email de confirmacion 
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })

        //Confirmacion mensaje confirmado 
        res.render('templates/mensaje',{
            pagina : 'Cuenta Creada Correctamente',
            mensaje : 'Se envio un correo de confirmacion a tu correo , da clic en el enlace para confirmar'
        })            
}
        //Formulario que comprueba una cuenta
        const confirmar = async (req,res) =>{
            const {token} = req.params;

        //Verificar si el token es valido
       const usuario = await Usuario.findOne({ where : {token}})

       if(!usuario){
            return res.render('auth/confirmar',{
                pagina:'Error al confirmar cuenta',
                mensaje:'Ups... Al parecer hubo un error al confirmar tu cuenta intentalo de nuevo',
                error: true
            })
       }

        //Confirmar la cuenta
        usuario.token = null ;
        usuario.confirmado = 1;
        await usuario.save();
        return res.render('auth/confirmar',{
            pagina:'Cuenta Confirmada',
            mensaje:'Cuenta Confirmada Correctamente'           
        })
        }

const formularioPassword = (req,res) => {
    res.render('auth/password',{
        pagina : 'Ruecupera Tu Contraseña',
        csrfToken : req.csrfToken()
    })
}

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
    //Buscar el usuario
    const  { email } = req.body
    const usuario = await Usuario.findOne({where:{email}})
    if (!usuario){
        return res.render('auth/password',{
            pagina: ' Recupera tu acceso a Bienes Raices',
            csrfToken : req.csrfToken(),
            errores : [{msg :'El Email no pertenece a ningun usuario'}]
        })
    }
    //Genrar token y enviar emial
    usuario.token= generarId();
    await usuario.save();

    //Enviar emial
    emailOlvidePassword({
        email: usuario.email,
        nombre : usuario.nombre,
        token : usuario.token        
    })
    //Renderizar mensaje
    res.render('templates/mensaje',{
        pagina : 'Restablece tu contraseña',
        mensaje : 'Hemos enviado un email con las instrucciones'
    }) 


};

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
        //Mostrar formulario para cambiar el password
        res.render('auth/reset',{
           pagina:  'Restablece tu contraseña',
           csrfToken : req.csrfToken() 
        })
        
}
    const nuevaContrasena = async (req,res) => {
   //Validar la contraseña
   await check('password').isLength({min:8}).withMessage('La contraseña debe de ser minimo 8 caracteres').run(req)
   let resultado = validationResult(req)
    
   //Verificar que el resulatado este vacio
   if(!resultado.isEmpty()){
       //Errores
       return res.render('auth/reset',{
           pagina : 'Restablecer tu contraseña',
           csrfToken : req.csrfToken(),
           errores: resultado.array(),             
       })
   }
    const {token} = req.params
    const {password} = req.body
    //Identificar quien hace el cambio
   const  usuario = await Usuario.findOne({where:{token}})
   console.log(usuario)
    //Hashear la nueva contraseña
    const salt  = await bcrypt.genSalt(10)
    usuario.password =  await bcrypt.hash(password , salt); 
    usuario.token= null
    await usuario.save()
    res.render('auth/confirmar',{
        pagina : 'Contraseña Actualizada',
        mensaje : 'Se cambio la contraseña correctamente'
    })

    }

    export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrar,
    confirmar,
    formularioPassword,
    resetPassword,
    comprobarToken,
    nuevaContrasena
    }