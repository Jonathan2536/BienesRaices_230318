import generalRoutes from './Routes/generalRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import express from 'express';

const app = express();

//Configrrar Templante Engine = PUG

app.set('view engine', 'pug');
app.set('views', './views');


const port = 3000;

app.listen(port, () => 
    console.log(`La aplicación ha iniciado en el puerto ${port}`)
);

app.use("/", generalRoutes);
app.use("/usuario", userRoutes);
