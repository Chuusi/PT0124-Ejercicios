//! 110.- Nos traemos las funciones que vayamos a utilizar para las rutas y nos creamos un router del server
//! Tras esto, creamos los endpoint llamando a las funciones como hemos hecho con los champions y las regions
//! En el index nos creamos el endpoint de las rutas para los users.

const {
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
    toggleFavRegions} = require("../controllers/Users.controller");
const {isAuth,isAuthAdmin} = require("../../middleware/auth.middleware");
const {upload} = require("../../middleware/files.middleware");
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/registroUser", upload.single("image"), registroUser);
UserRoutes.post("/login", login);
UserRoutes.post("/autoLogin", autoLogin);

UserRoutes.patch("/reenviarCodigo", reenviarCodigo);
UserRoutes.patch("/checkCC", checkNewUser);
UserRoutes.patch("/forgotPassword", changePassword);
UserRoutes.patch("/changePassword",[isAuth], modifyPassword);
UserRoutes.patch("/update", [isAuth], upload.single("image"), update);
UserRoutes.patch("/follow/:idUserASeguir", [isAuth], followUserToggle);
UserRoutes.patch("/championsFavs", [isAuth], toggleFavChampions);
UserRoutes.patch("/regionsFavs", [isAuth], toggleFavRegions);


//* Funcionalidad añadida 
UserRoutes.post("/changeForgotenPassword", changeForgotenPassword);
UserRoutes.patch("/changePassFromEmail/:token", changePassFromEmail);


UserRoutes.delete("/deleteUser",[isAuth], deleteUser);

//redirects

UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;