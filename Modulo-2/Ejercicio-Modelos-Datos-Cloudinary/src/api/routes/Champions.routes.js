//! 44.- Importamos la función upload de cloudinary y el create del controller de champion

const { upload } = require("../../middleware/files.middleware");
const { createChampion, 
    getChampionById, 
    getAllChampions, 
    getChampionByName, 
    updateChampion,
} = require("../controllers/Champions.controllers");

//! 45.- Nos importamos también el ROUTER de EXPRESS

const ChampionRoutes = require("express").Router();

//! 46.- Lanzamos el POST del controlador con el middlware de la subida de fotos de cloudinary

ChampionRoutes.post("/", upload.single("image"), createChampion);

//! 59.- Creamos el método get indicando como param el :id que pasaremos por la url

ChampionRoutes.get("/:id", getChampionById);

//! 63.- Y creamos el método para buscar todos los champions, lo iremos haciendo a partir de ahora con cada

ChampionRoutes.get("/", getAllChampions);
ChampionRoutes.get("/byName/:name", getChampionByName);
ChampionRoutes.patch("/:id", upload.single("image"), updateChampion);

//! 47.- Exportamos nuestra ruta para poder hacer uso de ella en el index

module.exports = ChampionRoutes;