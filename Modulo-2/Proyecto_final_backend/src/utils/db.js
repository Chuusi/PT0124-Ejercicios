//! 5.-Importamos o requerimos dotenv y mongoose en este archivo, que será el que gestione las DB

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//! 15.- Traemos la MONGO_URI

const MONGO_URI = process.env.MONGO_URI;

//! 16.- Añadimos la función asíncrona para conectarnos a la base de datos

const connect = async() => {
    //! 17.- Manejamos la conexión y errores con try catch

    try {
        const db = await mongoose.connect(MONGO_URI, {
            //! 18.- Parseamos la URL de mongo (MONGO_URI)

            useNewUrlParser: true,

            //! 19.- Unificamos los caracteres especiales

            useUnifiedTopology: true,
        });

        //! 20.- Nos creamos una variable que guardará el nombre y el host, para imprimirlo por consola

        const {name,host} = db.connection;
        console.log(`Conectados a la DB con el HOST: ${host} y el NAME: ${name} 👌`);
    } catch (error) {
        console.log("Error en la conexión con la DB 😰", error);
    }
}

//! 21.- Exportamos la función para conectarnos a la DB

module.exports = {connect};