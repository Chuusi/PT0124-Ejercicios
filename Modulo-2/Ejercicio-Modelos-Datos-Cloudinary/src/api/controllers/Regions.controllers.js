//! 50.- Llevamos a cabo los mismos pasos que en el champions.controllers para crear esta vez los controladores de region

const {deleteImgCloudinary} = require("../../middleware/files.middleware");
const Region = require("../models/Regions.model");

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

module.exports = {createRegion};