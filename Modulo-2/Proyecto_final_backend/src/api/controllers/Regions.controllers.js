//! 50.- Llevamos a cabo los mismos pasos que en el champions.controllers para crear esta vez los controladores de region

const { restart } = require("nodemon");
const {deleteImgCloudinary} = require("../../middleware/files.middleware");
const Champion = require("../models/Champions.model");
const Region = require("../models/Regions.model");

//? ---------------------------------------------------------------------------------------------------------
//! FUNCIÓN CREATE REGION
//? ---------------------------------------------------------------------------------------------------------

const createRegion = async(req,res,next) => {
    
    let catchImg = req.file?.path;

    try {
        
        await Region.syncIndexes();

        const newRegion = new Region(req.body);

        if(req.file){
            newRegion.icon = catchImg;
        } else {
            newRegion.icon = "https://res.cloudinary.com/dovicdqwe/image/upload/v1709576774/placeholder_image_hh4ptq.png"
        }

        const saveRegion = await newRegion.save();

        if (saveRegion) {
            return res.status(200).json(saveRegion);
        } else {
            return res.status(404).json({
                error: "😖 Ha habido un error al guardar la región 😖",
                message: error.message,
            })
        }

    } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImg);

        next(error);
        return (
            res.status(404).json({
                error: "😭 Fallo en la creación de la región 😭",
                message: error.message
            })
        )
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 86.- Función ADD o DELETE champion en una región con PATCH
//? ---------------------------------------------------------------------------------------------------------

const toggleChampion = async (req, res, next) => {
    try {
        //! 87.- Capturamos por params el id de la Region que queremos modificar y por body el id del champion. Buscamos la Region por id.

        const { id } = req.params;
        const { champions } = req.body;
        const regionById = await Region.findById(id);

        //! 88.- Controlamos si se ha encontrado una Region con esa id mediante un ifelse

        if (regionById) {
            
            //! 89.- Como se pueden pasar varios por el body, vamos a coger el string y pasarlo a array para manejarlo
            const arrayIdChampions = champions.split(",");

            //! 90.- Se recorre el array y se comprueba si hay que meter el campeón o sacarlo (en función de si ya está o no)
            //! Se utiliza Promise.all ya que serán varias funciones asíncronas.

            Promise.all(
                arrayIdChampions.map(async (champion, index) => {
                    if (regionById.champions.includes(champion)){

                        //! 91.- Si la Region incluye el champion en su array de champions, procedemos a borrarlo de ahí y además, borraremos la Region
                        //! del propio champion para que se elimine toda la información que los relaciona

                        try {
                            await Region.findByIdAndUpdate(id, {
                                $pull: { champions: champion }
                            });

                            //! 92.- Y ahora se intenta updatear al propio champion

                            try {
                                await Champion.findByIdAndUpdate(champion, {
                                    region: null,
                                });
                            } catch (error) {
                                res.status(404).json({
                                    error: "❌ No se pudo updatear el champion ❌",
                                    message: error.message,
                                }) && next(error);
                            }

                        } catch (error) {
                            res.status(404).json({
                                error: "❌ No se pudo updatear la region ❌",
                                message: error.message,
                            }) && next(error);
                        }
                    } else { //! 93.- Esto se ejecutará en caso de no incluirse el champion, para meter la información

                        try {
                            await Region.findByIdAndUpdate(id, {
                                $push: { champions: champion }
                            });

                            try {
                                await Champion.findByIdAndUpdate(champion, {
                                    region: id,
                                });
                            } catch (error) {
                                res.status(404).json({
                                    error: "❌ No se pudo updatear el champion ❌",
                                    message: error.message,
                                }) && next(error);
                            }

                        } catch (error) {
                            res.status(404).json({
                                error: "❌ No se pudo updatear la region ❌",
                                message: error.message,
                            }) && next(error);
                        }

                    }
                })
            )
            .catch((error) => res.status(404).json(error.message))
            .then(async () => {
                return res.status(200).json({
                    dataUpdate: await Region.findById(id).populate("champions"),
                });
            });

        } else {
            return res.status(404).json("❌ Región no encontrada ❌");
        }
    } catch (error) {
        //error en el añadido del champion
        res.status(404).json({
            error: "❌ Error en el add o delete del champion ❌",
            message: error.message,
        }) && next(error);
    }
};

module.exports = {createRegion, toggleChampion};