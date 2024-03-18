//! 1.-Tras instalar todos los paquetes, requerimos express para el servidor y .env para las variables de entorno
//? Paquetes: (nodemon -D, express, dotenv, mongoose, cloudinary, multer, multer-storage-cloudinary)

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//! 22.- Nos traemos la conexión de la DB y llamamos a la función de la conexión

const {connect} = require("./src/utils/db");
connect();

//! 23.- Nos traemos igualmente la conexión y configuración de cloudinary del middleware

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//! 2.-Nos traemos la variable PORT del .env

const PORT = process.env.PORT;

//! 3.-Creamos el servidor con express

const app = express();

//! 13.-Creamos las limitaciones de cantidad en el servidor de backend

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({limit:"5mb", extended:false}));

//! 45.- Traemos las rutas y las declaramos

const ChampionRoutes = require("./src/api/routes/Champions.routes");
app.use("/api/v1/champions", ChampionRoutes);

//! 52.- Nos traemos la ruta de Region

const RegionRoutes = require("./src/api/routes/Regions.routes");
app.use("/api/v1/regions", RegionRoutes);

const UserRoutes = require("./src/api/routes/Users.routes");
app.use("/api/v1/users", UserRoutes);

//! 14.-Añadimos los errores tanto de servidor como de usuario

app.use("*", (req,res,next) => {
    const error = new Error("❌ Ruta no encontrada ❌");
    error.status = 404;
    return next(error);
});

app.use((error, req, res) => {
    return res
    .status(error.status || 500)
    .json(error.message || "🤨 Error inesperado 🤨");
})


//! 6.-Nos creamos un nuevo proyecto en atlas mongoDB y agregamos nuestra IP y la ip ALL
//! 7.-Creamos un Database User con el nombre root y guardamos la contraseña
//! 8.-En Database, nos creamos una DB o Cluster y la conectamos, instalando la dependencia
//! 9.-En el .env, guardamos MONGO_URI con el código de conexión del cluster y el nombre de la DB
//! 10.-Desde Cloudinary, cogemos la API KEY y el API SECRET y los guardamos en el .env
//! 11.-Creamos el archivo files.middleware.js que nos configura cloudinary para la subida y bajada de archivos
//! 12.-Nos añadimos el archivo .gitignore para no añadir el archivo .env ni la carpeta node_modules


//! 4.-Escuchamos al servidor en el puerto adecuado

app.listen(PORT, () => {
    console.log(`Server listening on port 🎉"http://localhost:${PORT}"`);
});