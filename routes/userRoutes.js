import express, { request, response } from 'express';
const router = express.Router();

// GET
router.get("/FindById/:Id", function(request, response) {
    response.send(`Se está solicitando buscar al usuario con ID: ${request.params.Id}`);
});

// POST
router.post("/newUser/:name/:email/:password", function(request, response) {
    response.send(`Se ha solicitado la creación de un nuevo usuario de nombre ${request.params.name}, asociado al correo electrónico ${request.params.email} y con la contraseña ${request.params.password}`);
});

// PUT
router.put("/replaceUserByEmail/:email/:newPass/:newpassConfirm", function(request, response) {
    const { email, newPass, newpassConfirm } = request.params; // Destructuración de un objeto
    if (newPass === newpassConfirm) {
        response.send(`Se ha solicitado la actualización de la contraseña del usuario con correo ${email}. Se aceptan los cambios ya que la nueva contraseña y la confirmación son las mismas.`);
    } else {
        response.send(`Se ha solicitado la actualización de la contraseña del usuario con correo ${email}, pero se rechaza el cambio dado que la nueva contraseña y su confirmación no coinciden.`);
    }
});

// PATCH
router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm", function(request, response) {
    response.send(`Se ha solicitado la actualización de la contraseña del usuario con correo ${request.params.email}, con la nueva contraseña ${request.params.newPassword}.`);
});

// DELETE
router.delete("/deleteUser/:email", function(request, response) {
    const email = request.params.email;
    response.send(`Se ha solicitado la eliminación del usuario asociado al correo: ${email}`);
});



router.get("/login",function(request,response){//Petición callback
    response.render('auth/login')
    });
    
export default router;
