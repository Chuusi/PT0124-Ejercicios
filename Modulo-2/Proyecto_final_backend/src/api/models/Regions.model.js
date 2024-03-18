//! 48.- Creamos los modelos de las regiones de la misma manera que los modelos de los champions

const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const RegionSchema = new Schema(
    {
        name:{type: String, required: true, unique:true},
        icon:{type: String, required: false},
        champions:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Champion",
        }]
    },
    {
        timestamps: true,
    }
);

const Region = mongoose.model("Region", RegionSchema);

module.exports = Region;