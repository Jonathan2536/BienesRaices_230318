import express from 'express'; // Una sola importación de express
import generalRoutes from './routes/generalRoutes.js';
import usuarioRoutes from './routes/userRoutes.js';

// Crear la app
const app = express();

// Configurar el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', './views');  // Corregir el nombre de la carpeta 'Views' por 'views' (caso sensible)

const port = 3000;

// Configurar las rutas
app.use("/", generalRoutes);
app.use("/usuario", usuarioRoutes);

// Habilitar la carpeta pública
app.use(express.static('Public'));

// Iniciar el servidor en el puerto
app.listen(port, () => {
    console.log(`La aplicación se ha iniciado en el puerto ${port}`);
});


// Configura el puerto por donde va a pasar el servidor

// ¿Qué es una clase?
// ¿Qué es una instancia?
//Nose