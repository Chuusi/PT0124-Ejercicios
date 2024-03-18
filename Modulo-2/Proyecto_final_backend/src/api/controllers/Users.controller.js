const User = require("../models/Users.model");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const randomPassword = require("../../utils/randomPassword");
const {genderOk} = require("../../utils/enumOk");
const { getTestSendMail, setTestSendMail } = require("../../state/state.data");
const { generateToken, verifyToken } = require("../../utils/token");


const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { patch } = require("../routes/Users.routes");
dotenv.config();

//? ---------------------------------------------------------------------------------------------------------
//! 97.- Vamos a configurar el registro largo de usuario, iremos importando progresivamente según necesitemos
//? ---------------------------------------------------------------------------------------------------------

const registroUser = async (req, res, next) => {

    //! 98.- En primer lugar capturamos la imagen en caso de haberla mediante el middleware

    let catchImg = req.file?.path;

    //! 99.- Utilizamos try-catch por cada asincronía para poder controlar mejor los errores, vamos primero a sincronizar los indices

    try {
        await User.syncIndexes();

        //! 100.- Creamos una función en la carpeta utils para generar códigos aleatorios y la llamamos para asignar un número aleatorio

        let confirmationCode = randomCode();

        //! 101.- Requerimos el email y el nombre en el request body tras lo cual vamos a comprobar si ya existe un user con esos valores

        const {email, name} = req.body;

        const userExist = await User.findOne(
            {email: req.body.email},
            {name: req.body.name},
        );

        //! 102.- En caso de no existir el user, seguiremos con el guardado de datos y almacenamos el confirmationCode

        if(!userExist) {
            const newUser = new User({...req.body, confirmationCode});

            //! 103.- Comprobamos si el user ha metido una imagen, en caso contrario, pondremos una imagen placeholder

            if (req.file) {
                newUser.image = req.file.path;
            } else {
                newUser.image = "https://res.cloudinary.com/dovicdqwe/image/upload/v1708714305/depositphotos_137014128-stock-illustration-user-profile-icon_mvrold.webp";
            }

            //! 104.- Como ahora vamos a guardar el usuario y, por tanto, acceder a la base de dato con asincronía, añadimos TRY-CATCH

            try {
                const userSave = await newUser.save();

                //! 105.- Con nodemailer vamos a enviarle el código de confirmación generado, para ello, guardaremos en el .env nuestro mail
                //! y la password, tras lo cual nos creamos un transporte y procedemos a enviar controlando los fallos como siempre.

                if(userSave){
                    

                    //! 106.- Creamos un transporte, que podrá enviar mails desde el correo que tengamos en el .env
                    //! 108.- Con todo esto configurado, podemos mandar el mail usando el transporter
                    //! 107.- Configuramos las opciones del mail, mensaje, sujeto, destino, origen...
                    //! Todo esto lo haremos en el sendEmail.js, para modularizar todo un poco
                    //! Llamamos a sendMail y controlamos el error mediante la variable global

                    sendEmail(email, name, confirmationCode);
                    setTimeout(()=> {
                        if(getTestSendMail()){
                            setTestSendMail(false);
                            return res.status(200).json({
                                user: userSave,
                                confirmationCode,
                            });
                        } else {
                            setTestSendMail(false);
                            return res.status(404).json({
                                user: userSave,
                                confirmationCode: "ha habido un error, reenvío de código necesario",
                            });
                        }
                    }, 1500);


                    
                }

            //! 109.- Controlamos los errores que hemos ido guardando

            } catch (error) {
                res.status(404).json({
                    error: "❌ No se pudo guardar el nuevo user ❌",
                    message: error.message,
                }) && next(error);
            }

        } else{
            if(req.file) deleteImgCloudinary(catchImg);
            return res.status(409).json("Ya existe una cuenta con ese mail");

        }
    } catch (error) {
        if(req.file) deleteImgCloudinary(catchImg);
        return next(error);
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 111.------------- Creamos una función para reenviar código en caso de necesitarlo -----------------------
//? ---------------------------------------------------------------------------------------------------------

const reenviarCodigo = async (req, res, next) => {
    let newConfirmationCode = randomCode();
    try {
        //! 112.- Vamos a almacenar los datos mediante el body y vamos a usar la función creada en utils
        const {email, name} = req.body;
        const userExists = await User.findOne({email:email});

        if (userExists) {
            sendEmail(email, name, newConfirmationCode);
            //! 113.- Cuando verifiquemos el envío del nuevo código, tendremos que cambiar el código almacenado en el user
            //! En este caso, haremos un updateOne del código de confirmación
            setTimeout(async ()=> {
                if(getTestSendMail()){
                    setTestSendMail(false);
                    try {
                        await userExists.updateOne({confirmationCode:newConfirmationCode});
                    } catch (error) {
                        res.status(404).json("No se ha podido cambiar el código de confirmación, intenta de nuevo");
                    }
                    return res.status(200).json({
                        user: userExists,
                        newConfirmationCode,
                    });
                } else {
                    setTestSendMail(false);
                    return res.status(404).json({
                        user: userExists,
                        newConfirmationCode: "ha habido un error, reenvío de código necesario",
                    });
                }
            }, 2500);
        } else {
            return res.status(404).json("No existe un usuario con ese mail");
        }
    } catch (error) {
        return next(setError(500, error.message || "Error general en el envío del código"));
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 114.----- Función para comprobar que el código de confirmación es correcto y cambiar el check -----------
//? ---------------------------------------------------------------------------------------------------------

const checkNewUser = async (req, res, next) => {
    try {
        
        //! 115.- Almacenamos la información del body y buscamos el user con ese email

        const {email, confirmationCode} = req.body;
        const userExists = await User.findOne({email: email});
        
        if(!userExists){
            return res.status(404).json("No existe el usuario.");
        } else {
            
            //! 116.- En caso de coincidir el código del body con el almacenado en la DB, se hace una actualización
            //! de los datos de ese user para poner el check en true.

            if(confirmationCode === userExists.confirmationCode){
                try {
                    await userExists.updateOne({check:true});
                    const updateUser = await User.findOne({email});

                    return res.status(200).json({
                        testCheckOk: updateUser.check == true ? true : false,
                    });
                } catch (error) {
                    return res.status(404).json("No se pudo actualizar la información.");
                }
            } else{ //! 117.- En caso de no coincidir, se buscará el usuario para borrarlo de la DB.
                try {
                    await User.findByIdAndDelete(userExists._id);

                    deleteImgCloudinary(userExists.image);

                    return res.status(200).json({
                        userExists,
                        check:false,

                        delete: (await User.findById(userExists._id))
                        ? "No se borró el user al fallar el código de confirmación"
                        : "User borrado correctamente",
                    });
                } catch (error) {
                    return res
                    .status(404)
                    .json(error.message || "No se pudo borrar el usuario");
                };
            };
        };
    } catch (error) {
        //catch general
        return res
        .status(404)
        .json(error.message || "Error en la comprobación del código de confirmación");
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 118.----------------- Función para el LOGIN de usuarios en la página ------------------------------------
//? ---------------------------------------------------------------------------------------------------------

const login = async (req,res,next) => {
    try {
        //! 119.- Almacenamos el email y el password dados en el body y buscamos el user de ese email
        const {email, password} = req.body;
        const userDB = await User.findOne({email});

        //! 120.- Si encuentra un usuario, compara la contraseña dada y la almacenada mediante el bcrypt
        if(userDB){
            if(bcrypt.compareSync(password, userDB.password)) {
                
                //! 134.- En caso de coincidir, genera un token para el usuario

                const token = generateToken(userDB._id, email);
                return res.status(200).json({
                    user: userDB,
                    token,
                });
            } else {
                return res.status(404).json("Contraseña incorrecta");
            };
        } else {
            return res.status(404).json("Usuario no registrado");
        };
    } catch (error) {
        return next(error);
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 135.-------- Función para el AUTOLOGIN, la diferencia es en la comparación de contraseñas ---------------
//? ---------------------------------------------------------------------------------------------------------

const autoLogin = async (req,res,next) => {
    try {
        const {email, password} = req.body;
        const userDB = await User.findOne({email});
        if(userDB){
            if(password === userDB.password) {
                const token = generateToken(userDB._id, email);
                return res.status(200).json({
                    user: userDB,
                    token,
                });
            } else {
                return res.status(404).json("Contraseña incorrecta");
            };
        } else {
            return res.status(404).json("Usuario no registrado");
        };
    } catch (error) {
        return next(error);
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 136.----------- Cambio de CONTRASEÑA cuando NO SE ESTÁ LOGUEADO, se recibirá por mail -------------------
//? ---------------------------------------------------------------------------------------------------------

const changePassword = async(req,res,next) => {
    try {
        
        //! 137.- Tomamos el email por el body, buscaremos el User y si existe, redirigimos a la ruta de sendPassword

        const {email} = req.body;
        const userDB = await User.findOne({email});
        if(userDB){

            //! 138.- En caso de existir, haremos el redirect

            const PORT = process.env.PORT;
            return res.redirect(307,
                `http://localhost:${PORT}/api/v1/users/sendPassword/${userDB._id}`)
        } else {
            return res.status(404).json("Usuario no registrado");
        };
    } catch (error) {
        return next(error);
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 139.----- Ahora creamos la función que se lanzará en el redirect que hacemos en el changePassword -------
//? ---------------------------------------------------------------------------------------------------------

const sendPassword = async(req,res,next) => {
    try {
        
        //! 140.- En este caso obtendremos el user por el id que hemos pasado por id del param en el redirect
        //! Además almacenaremos los datos para usar nodemailer y, generaremos una contraseña segura que mandaremos

        const { id } = req.params;
        const userDB = await User.findById(id);
        const emailEnv = process.env.EMAIL;
        const password = process.env.PASSWORD;
    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailEnv,
                pass: password,
            }
        });
        let passwordSecure = randomPassword();

        const mailOptions = {
            from: emailEnv,
            to: userDB.email,
            subject: "-----",
            text: `
            Usuario: ${userDB.email}.
            Se ha recibido una solicitud de envío de nuevo código de acceso.
            Tu nuevo código de acceso es: ${passwordSecure}
            Si no has sido tú quien ha hecho la petición, contacte con nosotros.
            `
        };

        transporter.sendMail(mailOptions, async function (error, info) {
            if(error){
                return res.status(404).json({
                    error: "No se pudo mandar el email para el cambio de código de acceso",
                    message: error.message,
                });
            } else { //! 141.- En caso de mandarse el email, encriptaremos la nueva contraseña 
                    //! y la almacenaremos en la DB. Hacemos un testeo para comprobar todo

                console.log("Email enviado: " + info.response);

                const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

                try {
                    await User.findByIdAndUpdate(id, {password:newPasswordBcrypt});

                    //! 142.- Y aquí testeamos

                    const userUpdatePassword = await User.findById(id);

                    //! 143.- Si las contraseñas son iguales, status 200, sino, status 404.

                    if(bcrypt.compareSync(passwordSecure, userUpdatePassword.password)){
                        return res.status(200).json({
                            updateUser: true,
                            sendPassword: true,
                        });
                    } else {
                        return res.status(404).json({
                            updateUser: false,
                            sendPassword: true,
                        });
                    };

                } catch (error) {
                    return res.status(404).json(error.message);
                };
            };
        });
    } catch (error) {
        return next(error);
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 144.---------------- Función cambio de CONSTRASEÑA cuando ya estamos LOGUEADOS --------------------------
//? ---------------------------------------------------------------------------------------------------------

const modifyPassword =  async(req,res,next) => {

    //! 145.- Vamos a traernos la antigua y la nueva contraseña del body
    //! así como el id del user registrado del propio req.user

    try {
        const {password,newPassword} = req.body;
        const {_id} = req.user;

        //! 146.- Vamos a comparar la contraseña introducida con la almacenada y, sin coincide, la cambiamos

        if(bcrypt.compareSync(password, req.user.password)){
            const newPasswordBcrypt = bcrypt.hashSync(newPassword, 10);
            
            try {
                await User.findByIdAndUpdate(_id, {password:newPasswordBcrypt});

                //! 147.- Y testeamos para ver que todo ha salido bien

                const userUpdate = await User.findById(_id);

                if(bcrypt.compareSync(newPassword, userUpdate.password)){
                    return res.status(200).json({
                        updateUser: true,
                    });
                } else {
                    return res.status(404).json({
                        updateUser: false,
                    });
                };
            } catch (error) {
                return res.status(404).json(error.message);
            }
        } else {

            //! 148.- Avisamos en caso de no coincidir la contraseña del body con la almacenada

            return res.status(404).json("Contraseña antigua incorrecta");

        }
    } catch (error) {
        return next(error);
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 149.-------- Función UPDATE para cambiar la información guardada en las DB en tu propia cuenta ----------
//? ---------------------------------------------------------------------------------------------------------

const update = async (req,res,next) => {
    //! 150.- Como siempre que haya un posible manejo de archivos, capturamos la posible imagen

    let catchImg = req.file?.path;

    try {
        
        //! 151.- Actualizamos los elementos unique del modelo

        await User.syncIndexes();

        //! 152.- Vamos a crear un nuevo objeto User que almacene la información nueva que se pase por el body
        //! para luego asignar la información a los diferentes campos

        const updateUser = new User(req.body);

        req.file && (updateUser.image = catchImg);

        //! 153.- Guardamos la información que no queremos que se cambie bajo ningún concepto

        updateUser._id = req.user._id;
        updateUser.password = req.user.password;
        updateUser.rol = req.user.rol;
        updateUser.confirmationCode = req.user.confirmationCode;
        updateUser.email = req.user.email;
        updateUser.check = req.user.check;

        //! 154.- Aquella información que sea enum, irá dentro de if y usará la función almacenada en enumOk.
        //! En caso de introducir algo inválido, se quedará la información antigua ya almacenada.

        if(req.body?.gender) {
            const resultEnum = genderOk(req.body?.gender);
            updateUser.gender = resultEnum.check ? req.body?.gender : req.user.gender;
        }

        //! 155.- Con un findByIdAndUpdate vamos a buscar el user por el id y vamos a pasarle todo lo almacenado en updateUser

        try {
            await User.findByIdAndUpdate(req.user._id, updateUser);
            if(req.file) deleteImgCloudinary(req.user.image);

            //! 156.- Y testeamos

            const testUpdateUser = await User.findById(req.user._id);

            const updateKeys = Object.keys(req.body);

            const testUpdate = [];

            updateKeys.forEach((item) => {

                if(testUpdateUser[item] === req.body[item]){

                    if(testUpdateUser[item] != req.user[item]){
                        testUpdate.push({[item]:true});
                    } else {
                        testUpdate.push({[item]:"Misma información que la antigua"});
                    };

                } else {
                    testUpdate.push({[item]:false});
                };
            });

            //! 157.- Y testeamos la imagen

            if(req.file){
                testUpdateUser.image === catchImg
                ? testUpdate.push({image: true})
                : testUpdate.push({image: false});
            };

            //! 158.- Una vez actualizado, devolvemos como respuesta los datos y el test

            return res.status(200).json({
                testUpdateUser,
                testUpdate,
            });
        } catch (error) {
            if (req.file) deleteImgCloudinary(catchImg);
            return res.status(404).json(error.message);
        };
    } catch (error) {
        if (req.file) deleteImgCloudinary(catchImg);
        return next(error);
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 159.--------------------------------- Función DELETE de la DB -------------------------------------------
//? ---------------------------------------------------------------------------------------------------------

const deleteUser = async (req,res,next) => {
    try {
        const { _id, image } = req.user;
        await User.findByIdAndDelete(_id);

        if(await User.findById(_id)) {
            return res.status(404).json("Usuario no borrado.");
        } else {
            deleteImgCloudinary(image);
            return res.status(200).json("Usuario borrado");
        }
    } catch (error) {
        return next(error);
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 160.--------------------------------- Función FOLLOW USER -----------------------------------------------
//? ---------------------------------------------------------------------------------------------------------

const followUserToggle = async(req, res, next) => {
    try {

        //! 161.- Pasaremos por param el id del user al que queramos seguir y almacenaremos la lista de seguidos

        const {idUserASeguir} = req.params;
        const {followed} = req.user;
        const seguidoONo = await User.findById(idUserASeguir);


        if(followed.includes(idUserASeguir)){
            
            //! 162.- Si ya lo incluye, lo que hace es buscar ambos users y en uno lo saca de la lista followed
            //! y en otro de la lista followers.
            
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        followed: idUserASeguir,
                    },
                });

                try {
                    await User.findByIdAndUpdate(idUserASeguir, {
                        $pull: {
                            followers: req.user._id,
                        }
                    });

                    return res.status(200).json({
                        accion: `Has dejado de seguir a ${seguidoONo.name}`,
                        authUser: await User.findById(req.user._id),
                        userUnfollowed: seguidoONo,
                    });

                } catch (error) {
                    return res.status(404).json({
                        error: `No se pudo eliminar de la lista de seguidores de ${seguidoONo.name}`,
                        message: error.message,
                    });
                };
            } catch (error) {
                return res.status(404).json({
                    error: `No se pudo eliminar a ${seguidoONo.name} de tu lista de seguidos`,
                    message: error.message,
                });
            };
        } else { //! 163.- En este caso, se hace lo contrario del código en el if.
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        followed: idUserASeguir,
                    },
                });
                try {
                    await User.findByIdAndUpdate(idUserASeguir, {
                        $push: {
                            followers: req.user._id,
                        }
                    });

                    return res.status(200).json({
                        accion: `Has empezadoa a seguir a ${seguidoONo.name}`,
                        authUser: await User.findById(req.user._id),
                        userFollowed: seguidoONo,
                    });

                } catch (error) {
                    return res.status(404).json({
                        error: `No se pudo añadir a la lista de seguidores de ${seguidoONo.name}`,
                        message: error.message,
                    });
                };
            } catch (error) {
                return res.status(404).json({
                    error: `No se pudo añadir a ${seguidoONo.name} a tu lista de seguidos`,
                    message: error.message,
                });
            };
        };
    } catch (error) {
        return next(error);
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 164.-------------------------- Función redirect cambio de password con token-----------------------------
//? ---------------------------------------------------------------------------------------------------------
//* FUNCIONALIDAD AÑADIDA: Solicitar un cambio de contraseñas a través del mail, lo que envía al mail es una ruta
//* con un token generado, ese link llevará a una ruta que tomará el token y lo decodificará para acceder al usuario.
//* El usuario deberá introducir una nueva contraseña 2 veces y, en caso de coincidir, se cambiará la contraseña almacenada.

const changeForgotenPassword = async(req,res,next) => {
    try {

        //! 165.- Pedimos el mail por el body y buscamos el usuario, al cuál enviaremos un mail con un token generado para ese mail

        const { email } = req.body;
        const userDB = await User.findOne({email:email});
        const emailEnv = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailEnv,
                pass: password,
            }
        });
        const token = generateToken(userDB, userDB.email);
        const mailOptions = {
            from: emailEnv,
            to: userDB.email,
            subject: "-----",
            text: `
            Usuario: ${userDB.email}.
            Se ha recibido una solicitud de envío de nuevo código de acceso.
            Para cambiar tu contraseña ve a http://localhost:8080/api/v1/users/changeForgotenPassword/${token}.
            Si no has sido tú quien ha hecho la petición, contacte con nosotros.
            `
        };
        transporter.sendMail(mailOptions, async function (error, info) {
            if(error){
                return res.status(404).json({
                    error: "No se pudo mandar el email para el cambio de código de acceso",
                    message: error.message,
                });
            } else {
                console.log("Email enviado: " + info.response);
                return res.status(200).json("El mail se envió correctamente.");
            };
        });
    } catch (error) {
        return next(error);
    };
};

const changePassFromEmail = async(req,res,next) => {
    
    //! 166.- Ahora tomamos el token pasado por param del enlace que mandamos por mail y lo decodificamos.

    try {
        const {token} = req.params;
        const decoded = verifyToken(token);

        //! 167.- Pedimos una nueva contraseña 2 veces y hashearemos la nueva contraseña

        const {newPass,newPassCheck} = req.body;
        const newPassBcrypt = bcrypt.hashSync(newPass, 10);
        if (newPass === newPassCheck) {
            
            //! 168.- En caso de coincidir, buscaremos el User por el id del token decodificado y modificaremos la contraseña
            
            try {
                await User.findByIdAndUpdate(decoded.id, {password:newPassBcrypt});

                //! 169.- Verificamos que la contraseña que ha introducido coincide con la que se ha almacenado en la DB

                const userUpdate = await User.findById(decoded.id);

                if(bcrypt.compareSync(newPass, userUpdate.password)){
                    return res.status(200).json("La contraseña se cambió");
                } else {
                    return res.status(404).json("La contraseña NO se cambió");
                }
            } catch (error) {
                return res.status(404).json("Error en el cambio de contraseña");
            }
        } else {
            return res.status(404).json("Las contraseñas no coinciden");
        }
    } catch (error) {
        return next(error);
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 170.--------------------- Función toggle para favs de campeones -----------------------------------------
//? ---------------------------------------------------------------------------------------------------------

const toggleFavChampions = async(req,res,next) => {
    //! 171.- Vamos a añadir campeones a la lista únicamente si estamos logueados, requerimos el id del user y
    //! tomamos los campeones de un string de ids que separaremos por "," y separaremos mediante la función split

    try {
        const {id} = req.user;
        let champions = req.body.champions;
        const userDB = await User.findById(id);
        const listChampions = champions.split(",");

        //! 172.- Recorremos la lista de ids y comprobamos por cada una si ya están en la lista o no para, en caso de
        //! estar, quitarlo y, en caso de no estar, añadirlo.

        for(champion of listChampions){
            if (userDB.championsFav.includes(champion)) {
                try {
                    await User.findByIdAndUpdate(id,{
                        $pull: {
                            championsFav: champion,
                        },
                    });
                } catch (error) {
                    return res.status(404).json("ERROR al quitar el champion de la lista de favoritos");
                };
            } else {
                try {
                    await User.findByIdAndUpdate(id,{
                        $push: {
                            championsFav: champion,
                        },
                    });
                } catch (error) {
                    return res.status(404).json("ERROR al añadir el champion a la lista de favoritos");
                };
            };
        };

        //! 173.- Testeamos

        try {
            const userUpdate = await User.findById(id);
            let checkList = [];
            for(champion of listChampions){
                
                if((userDB.championsFav.includes(champion) && !userUpdate.championsFav.includes(champion))
                || (!userDB.championsFav.includes(champion) && userUpdate.championsFav.includes(champion))){
                    checkList.push({check:true})
                } else {
                    checkList.push({check:false});
                };
            };
            return res.status(200).json({
                message: `${userDB.name}, se modificó tu lista de favoritos con éxito.`,
                favChampsUpdate: userUpdate.championsFav,
            });
        } catch (error) {
            return res.status(404).json("ERROR en el testeo final.");
        };
    } catch (error) {
        return next(error);
    };
};

//? ---------------------------------------------------------------------------------------------------------
//! 174.--------------------- Función toggle para favs de regiones ------------------------------------------
//? ---------------------------------------------------------------------------------------------------------

const toggleFavRegions = async(req,res,next) => {
    try {
        const {id} = req.user;
        let regions = req.body.regions;
        const userDB = await User.findById(id);
        const listRegions = regions.split(",");
        for(region of listRegions){
            if (userDB.regionsFav.includes(region)) {
                try {
                    await User.findByIdAndUpdate(id,{
                        $pull: {
                            regionsFav:region,
                        },
                    });
                } catch (error) {
                    return res.status(404).json("ERROR al quitar la región de la lista de favoritos");
                };
            } else {
                try {
                    await User.findByIdAndUpdate(id,{
                        $push: {
                        regionsFav:region,
                        },
                    });
                } catch (error) {
                    return res.status(404).json("ERROR al añadir la región a la lista de favoritos");
                };
            };
        };

        //! 175.- Testeo final

        try {
            const userUpdate = await User.findById(id);
            let checkList = [];
            for(region of listRegions){
                
                if((userDB.regionsFav.includes(region) && !userUpdate.regionsFav.includes(region))
                || (!userDB.regionsFav.includes(region) && userUpdate.regionsFav.includes(region))){
                    checkList.push({check:true})
                } else {
                    checkList.push({check:false});
                };
            };
            return res.status(200).json({
                message: `${userDB.name}, se modificó tu lista de regiones favoritas con éxito.`,
                favRegionsUpdate: userUpdate.regionsFav,
            });
        } catch (error) {
            return res.status(404).json("ERROR en el testeo final.");
        };
    } catch (error) {
        return next(error);
    };
};

module.exports = {
    registroUser,
    reenviarCodigo,
    checkNewUser,
    login,
    autoLogin,
    changePassword,
    sendPassword,
    modifyPassword,
    update,
    deleteUser,
    followUserToggle,
    changeForgotenPassword,
    changePassFromEmail,
    toggleFavChampions,
    toggleFavRegions,
};