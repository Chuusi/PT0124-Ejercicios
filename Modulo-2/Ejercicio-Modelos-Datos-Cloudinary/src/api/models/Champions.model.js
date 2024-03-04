//! 24.- Requerimos mongoose para poder crearnos los esquemas de datos

const mongoose = require("mongoose");

//! 25.- Asignamos la parte de esquemas a una variable (opcional, pues se puede hacer directamente)

const Schema = mongoose.Schema;

//! 26.- Y creamos el esquema de datos para los campeones

const ChampionSchema = new Schema(
    {
        //! 27.- En cada variable que incluyamos en nuestro esquema, pondemos qué requisitos o características tendrá

        name:{type:String, required: true, unique: true},
        gender:{type: String, enum: ["masculino","femenino","otro"], required:false},
        race:{type:String, enum:["ascendidos","celestial","cyborg","darkin","demonios","humanos","minotauros","nacidos en el hielo","renacido","vastaya","yeti","yordle"], required: true},
        age:{type:Number, required: false},
        image: {type: String, required: false},
        region: [{
            //! 28.- Añadiremos más tarde el esquema de las regiones
            //! 49.- Ya podemos añadir el modelo de regions
            type: mongoose.Schema.Types.ObjectId,
            ref: "Region",

        }],
    },
    {
        //! 29.- Guardamos el momento en el que el objeto se crea

        timestamps: true,
    }
);

//! 30.- Por último, creamos el modelo de datos a partir del esquema y lo exportamos para que pueda ser usado por los controllers

const Champion = mongoose.model("Champion", ChampionSchema);

module.exports = Champion;