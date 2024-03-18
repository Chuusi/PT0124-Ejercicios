//! 94.- Importamos bcrypt para el encriptado de contraseñas, validator para validar emails y contraseñas y mongoose
//! Tras esto, comenzamos a crearnos el Schema con todos los datos que queramos que tengan nuestros USERS.

const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validator.isEmail, "Introduce un mail válido"], 
        },
        name : {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password : {
            type: String,
            required: true,
            trim: true,
            validate: [validator.isStrongPassword, "La contraseña debe contener entre mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo al menos."],
        },
        gender : {
            type: String,
            enum: ["masculino","femenino","otro"],
            required: true
        },
        rol : {
            type: String,
            enum: ["admin","user","superadmin"],
            default: "user",
        },
        confirmationCode : {
            type: Number,
            required: true,
        },
        check : {
            type: Boolean,
            default: false,
        },
        image: {
            type: String
        },
        followed: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        championsFav: [{type: mongoose.Schema.Types.ObjectId, ref: "Champion"}],
        regionsFav: [{type: mongoose.Schema.Types.ObjectId, ref: "Region"}],
        blockedByApp: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

//! 95.- Creamos un middleware que se ejecutará siempre antes de llamar a la función save para encriptar las contraseñas

UserSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next("Error hashing password", error);
    }
});

//! 96.- Asignamos el esquema al modelo y lo exportamos

const User = mongoose.model("User", UserSchema);

module.exports = User;