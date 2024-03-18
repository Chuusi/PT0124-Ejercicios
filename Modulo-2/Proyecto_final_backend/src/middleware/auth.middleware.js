//! 127.- Vamos a generar el middleware del authenticator, nos servirá para verificar si el usuario posee
//! un token y, por tanto, está logueado en nuestra página y así puede acceder a determinadas rutas únicamente
//! permitidas para usuarios logueados. Importamos User, verifyToken y dotenv

const User = require("../api/models/Users.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = async (req,res,next) => {

    //! 128.- Primero vamos a requerir el token almacenado en el header de nuestra página (información no visible),
    //! Este código al requerirlo viene como "Bearer **código**" por lo que reemplazaremos ese texto por un string vacío.

    const token = req.headers.authorization?.replace("Bearer ", "");

    //! 129.- Verificamos si se ha traído algún token para, que en caso de no haberlo, podamos avisar de la falta de auth

    if(!token){
        return next(new Error("No autorizado"));
    };

    //! 130.- Comprobamos el token con la función generada en token.js, esto almacenará en la const decoded un objeto
    //! con el mail y el id del user. La clave de JWT la generamos nosotros mismos.

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        //! 131.- Mediante la información almacenada en decoded, podemos hacer un req.user para tener sus datos

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(error);
    };
};

//! 132.- Además, vamos a generar de la misma forma una función middleware para verificar si el user es admin
//! Esta no se ha utilizado de momento

const isAuthAdmin = async (req,res,next) => {

    const token = req.headers.authorization?.replace("Bearer ", "");

    if(!token){
        return next(new Error("No autorizado"));
    };

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        //! 133.- Añadimos una comprobación de rol

        if(req.user.rol !== "admin"){
        return next(new Error("No autorizado, no eres admin"));
        }
        next();
    } catch (error) {
        return next(error);
    };
};

module.exports = {
    isAuth,
    isAuthAdmin
}