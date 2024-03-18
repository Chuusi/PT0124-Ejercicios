//! 51.- Igual en el caso de las rutas, hacemos lo mismo que con los champions y exportamos al index

const {upload} = require("../../middleware/files.middleware");
const {createRegion, toggleChampion} = require("../controllers/Regions.controllers");

const RegionRoutes = require("express").Router();

RegionRoutes.post("/", upload.single("icon"), createRegion);
RegionRoutes.patch("/:id", toggleChampion);

module.exports = RegionRoutes;