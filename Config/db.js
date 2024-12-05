import Sequelize from 'sequelize'
import dotenv from 'dotenv' 
dotenv.config({path: '.env'})

//Se declara la BD

//El process.env es una manera de ocultar nuestros datos y asi no puedan robarlos 

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: process.env.BD_HOST,
    port: 3307,
    dialect: 'mysql',
    define: {
        timestamps: true //Este agregara 2 columnas extras cuando un usuario se registre a la tabla de usuarios
        //Una sera de cuando se creo y la otra de cuando se actualizo, esto se creara auutomaticamente
    },
    pool:{
        max:5,//Este es el maximo de conexiones a mantener
        min:0,
        acquire:30000,//Es el tiempo que pasara tratando de elaborar una conexion antes de marcar un error, son 30segundos
        idle:10000//Es el tiempo de espera antes de que la conexione finalice, son 10 segundos
    },
    //El pool configura como sera el comportamiento para conexionnes nuevas o existentes
    
});

export default db;