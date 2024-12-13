import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:  process.env.EMAIL_PORT,
    auth: {
      user:  process.env.EMAIL_USER,
      pass:  process.env.EMAIL_PASS
    }
  });
  const  { email , nombre , token} = datos
  //Enviar emial
  await transport.sendMail({
      from : 'BienesRaices_230318.com',
      to : email,
      subject : 'Confirma tu cuenta en BienesRaices_230318.com',
      text : 'Confirma tu cuenta en BienesRaices_230318.com',
      html : `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de cuenta</title>
</head>
<body style="background-color: #FAF3E0; font-family: 'Georgia', serif; color: #5A4D41; margin: 0; padding: 0;">
    <div style="background-color: #DCC6A0; padding: 20px; text-align: center;">
        <h1 style="color: #FFFFFF;">Bienvenido a BienesRaices</h1>
    </div>

    <div style="padding: 20px;">
        <p style="font-size: 16px; color: #5A4D41;">Hola ${nombre},</p>

        <p style="font-size: 18px; color: #5A4D41; font-weight: bold;">
            Gracias por registrarte en <strong>BienesRaices</strong>.
        </p>
        <p style="font-size: 16px; color: #5A4D41;">
            Nos alegra que hayas decidido unirte a nosotros. Para activar tu cuenta, por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:
        </p>

        <p style="text-align: center;">
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}"
              style="font-size: 18px; color: #FFFFFF; background-color: #BCA381; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Confirmar Cuenta
            </a>
        </p>

        <p style="font-size: 16px; color: #5A4D41;">
            Si no solicitaste esta cuenta, puedes ignorar este mensaje. No se realizará ninguna acción sin tu confirmación.
        </p>

        <br>
        <div style="margin-top: 30px; padding: 20px; background-color: #F7ECD8; color: #5A4D41; text-align: center;">
            <p style="font-size: 16px;">Saludos cordiales,</p>
            <p style="font-size: 18px; font-weight: bold;">Equipo de BienesRaices</p>
            <img src="http://localhost:3000/Helpers/Firmajonathan.png" alt="firma" width="250" height="150">
            <p style="font-size: 16px;">"Haciendo realidad tus sueños inmobiliarios"</p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #DCC6A0; color: #FFFFFF; text-align: center;">
            <p style="font-size: 14px;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p style="font-size: 14px;">BienesRaices - Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>

      `
  })
}

const emailOlvidePassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:  process.env.EMAIL_PORT,
        auth: {
          user:  process.env.EMAIL_USER,
          pass:  process.env.EMAIL_PASS
        }
      });
      const  { email , nombre , token} = datos
      //Enviar emial
      await transport.sendMail({
          from : 'BienesRaices_230318.com',
          to : email,
          subject : 'Restablece tu contraseña en BienesRaices_230318.com',
          text : ' Restablece tu contraseña en BienesRaices_230318.com',
          html : `
                  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de cuenta</title>
</head>
<body style="background-color: #FAF3E0; font-family: 'Georgia', serif; color: #5A4D41; margin: 0; padding: 0;">
    <div style="background-color: #DCC6A0; padding: 20px; text-align: center;">
        <h1 style="color: #FFFFFF;">BienesRaices_230318</h1>
    </div>

    <div style="padding: 20px;">
        <p style="font-size: 16px; color: #5A4D41;">Hola ${nombre},</p>

        <p style="font-size: 18px; color: #5A4D41; font-weight: bold;">
            Has solicitado restablecer tu contraseña en <strong>BienesRaices_230417</strong>.
        </p>
        <p style="font-size: 16px; color: #5A4D41;">
            Sigue el siguiente enlace para crear una contraseña nueva:
        </p>

        <p style="text-align: center;">
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/password/${token}" 
              style="font-size: 18px; color: #FFFFFF; background-color: #BCA381; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Restablecer Contraseña
            </a>
        </p>

        <p style="font-size: 16px; color: #5A4D41;">
            Si no solicitaste este cambio, puedes ignorar este mensaje.
        </p>

        <br>
        <div style="margin-top: 30px; padding: 20px; background-color: #F7ECD8; color: #5A4D41; text-align: center;">
            <p style="font-size: 16px;">Saludos cordiales,</p>
            <p style="font-size: 18px; font-weight: bold;">Jonathan Emmanuel López Morales</p>
            <img src=" alt="firma" width="250px" height="150px">
            <p style="font-size: 16px;">CEO y Fundador de BienesRaices_230318p>
            <p style="font-size: 14px;">"Nuestro compromiso es brindarte las mejores oportunidades en el mundo inmobiliario."</p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #DCC6A0; color: #FFFFFF; text-align: center;">
            <p style="font-size: 14px;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p style="font-size: 14px;">BienesRaices_230318 - Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>

          `
      })
    }

export {
    emailRegistro,
    emailOlvidePassword
}