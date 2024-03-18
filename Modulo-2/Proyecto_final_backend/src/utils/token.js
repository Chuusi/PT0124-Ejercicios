//! 121.- Vamos a instalar JWT y a crear la función para crear un token

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, email) => {
    
    //! 122.- Lanzaremos un error en caso de faltar el id o el email

    if(!id || !email) {
        throw new Error("Falta el id o el email");
    }

    //! 123.-Si se recibe bien, registramos la petición de token, pasando la información que necesita y la palabra secreta
    //! que se genera en el authMiddleware que se guardará en el .env.

    return jwt.sign({id,email}, process.env.JWT_SECRET, {expiresIn:"1d"});
};

//! 124.- Generamos una función para decodificar y verificar si el token sigue siendo válido.

const verifyToken = (token) => {
    
    //! 125.- Comprobamos si hay token

    if(!token){
        throw new Error("No se ha encontrado el token");
    }

    //! 126.- En caso de haberlo, lo checkeamos con jwt

    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports= {
    generateToken,
    verifyToken,
};