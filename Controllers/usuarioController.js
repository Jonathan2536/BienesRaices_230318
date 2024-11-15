const formularioLogin = (req,res) => {
    res.render('auth/login',{
         pagina : 'IniciarSesión'
    })
}
const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
        pagina : 'Crear cuenta'
    })
}
const formularioPassword = (req,res) => {
    res.render('auth/password',{
        pagina : 'Ruecupera Tu Contraseña'
    })
}
export {
    formularioLogin,
    formularioRegistro,
    formularioPassword
}