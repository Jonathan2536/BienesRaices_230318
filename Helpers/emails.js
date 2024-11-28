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

<
<html lang="es">
<head>
    
 
<meta charset="UTF-8">
    
 
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <
<title>Confirmación de Cuenta</title>
    
  
<style>
        

   

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f1ea; /* Fondo crema claro */
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff; /* Fondo blanco */
            border: 1px solid #d4b79f; /* Borde café claro */
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #6b4f4f; /* Café oscuro */
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            color: #ffffff;
            background-color: #8c6d5a; /* Botón café mediano */
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
        }
        .btn:hover {
            background-color: #6b4f4f; /* Café oscuro al pasar el mouse */
        }
        p {
            color: #4d4030; /* Café suave para texto */
            line-height: 1.8;
            font-size: 16px;
        }
        .signature {
            margin-top: 20px;
            font-style: italic;
            font-weight: bold;
            color: #4d4030; /* Café suave */
        }
        .signature img {
            display: block;
            margin: 10px auto;
            height: 50px;
        }
        footer {
            margin-top: 30px;
            background-color: #8c6d5a; /* Fondo café mediano */
            color: #ffffff;
            padding: 10px;
            font-size: 14px;
        }
        footer a {
            color: #f4f1ea; /* Enlace crema claro */
            text-decoration: none;
        }
        footer a:hover {
            color: #d4b79f; /* Cambio a café claro al pasar el mouse */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Haz clic en el siguiente enlace para confirmar tu cuenta:</h1>
        <a href="#" class="btn">Confirmar tu cuenta</a>
        <p>
Si no reconoces esta solicitud o no has creado una cuenta, por favor ignora este mensaje. Gracias por elegir Bienes Raíces. ¡Nos emociona ayudarte a encontrar la propiedad ideal para ti!      
</p>
        
      
<div class="signature">
            Atentamente,
            Atentament

       
<br>
            Jonathan Emmanuel López Morales
<br>
            
               <div style="text-align: center; margin: 20px 0;">
          <img src="Firmajonathan.png" alt="Bienes Raíces" style="max-width: 100%; height: auto;" />
        </div>
        </div>
    </div>
    <footer>
        BienesRaices.com — Proyecto realizado por Jonathan Emmanuel López Morales.<

        BienesRaices.com 


        
<br>
        
        
<a href="#">Jonathan2536</a>
    
    </foote

   
</footer>

</bo
</body>

</html
</html>
      `
  })
}


export {
    emailRegistro
}