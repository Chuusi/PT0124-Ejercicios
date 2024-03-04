//! 31.- Hacemos importación de método de cloudinary y del MODELO del Champion

const {deleteImgCloudinary} = require("../../middleware/files.middleware");
const { genderOk, raceOk } = require("../../utils/enumOk");
const Champion = require("../models/Champions.model");

//? ---------------------------------------------------------------------------------------------------------
//! 32.- Vamos a crearnos la función CREATE o POST para poder añadir personajes con su correspondiente imagen
//? ---------------------------------------------------------------------------------------------------------

const createChampion = async(req,res,next) => {
    //! 33.- Capturamos la url de la imagen de cloudinary, se captura la imagen porque si hay un error en el controlador, el elemento no se crea. 
    
    let catchImg = req.file?.path;

    try {
        //! 34.- Se actualizan indexs, que se forman al lanzar la función, de manera que si se ha modificado el modelo, podemos sincronizarlo con el controlador

        await Champion.syncIndexes();

        //! 35.- Creamos una instancia de champion, y definimos sus keys tal cual recibimos en el req.body

        const newChampion = new Champion(req.body);

        //! 36.- Valoramos si se ha recibido imagen o no, para en caso negativo, usar una imagen placeholder base que hemos almacenado en cloudinary

        if(req.file){
            newChampion.image = catchImg;
        } else{
            newChampion.image = "https://res.cloudinary.com/dovicdqwe/image/upload/v1708714305/depositphotos_137014128-stock-illustration-user-profile-icon_mvrold.webp"
        }

        //! 37.- Guardamos la instancia del nuevo Champion que hemos creado

        const saveChampion = await newChampion.save();

        //! 38.- Controlamos si se ha guardado o no mediante un ifelse devolviendo el status de la respuesta

        if(saveChampion){
            //! 39.- En caso de haberse guardado, status 200 indicará que todo ha salido bien

            return res.status(200).json(saveChampion);
        } else{
            //! 40.- En caso de haber un fallo, status 404 indicará que NO ha salido bien el guardado

            return res.status(404).json({
                error: "😥 Ha habido un fallo al guardar tu campeón 😥",
                message: error.message
            });
        }
    } catch (error) {
        //! 41.- Y en este catch controlaremos si ha habido cualquier error, para que se borre la imagen de cloudinary y que devolvamos la respuesta con el error producido

        req.file?.path && deleteImgCloudinary(catchImg);

        //! 42.- Mostramos el siguiente error y devolvemos el status 404 para indicar el fallo con el mensaje que queramos y el propio error por consola

        next(error);
        return (
            res.status(404).json({
                message: "💀 Fallo en la creación del campeón 💀",
                error: error,
            }) && next(error)
        )
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 53.- Función GET BY ID para poder obtener champions por su id para manejarlos en posteriores funciones
//? ---------------------------------------------------------------------------------------------------------

const getChampionById = async (req, res, next) => {
    try {
        //! 54.- Hacemos una petición del parámetro id, este parámetro es el que aparecerá en la ruta
        
        const { id } = req.params;

        //! 55.- Una vez lo tengamos, buscaremos el champion por la id con la función propia de mongoose
        //! findByID, buscando entre los modelos de Chamion

        const championById = await Champion.findById(id);

        //! 56.- Y comprobamos si se ha encontrado el Champion o no con un ifelse, en este caso en una línea
        //! para ver distintos modos de hacerlo

        championById 
        ? res.status(200).json(championById) 
        : res.status(404).json("No se encontró el champion, introduce un id correcto 🔍");


    } catch (error) {
        //! 57.- Si hay cualquier fallo durante la búsqueda, lo señalaremos aquí
        
        return res.status(404).json({
            error: "Ha habido un error en la busqueda por ID 🔍",
            message: error.message
        })
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 60.- Función GET ALL para obtener un array con TODOS los objetos Champion en la DB
//? ---------------------------------------------------------------------------------------------------------

const getAllChampions = async (req,res,next) => {
    try {
        //! 61.- Con el método de mongoose find() intentará encontrar todos los Champion en la DB,
        //! esto nos devolverá un array con todos los champions, controlaremos si nos ha encontrado
        //! de manera eficaz lo que queremos, comprobando que su longitud es mayor que 0, lo que quiere
        //! decir que habrá encontrado algo
        
        const allChampions = await Champion.find();

        if(allChampions.length > 0){
            return res.status(200).json(allChampions);
        } else {
            return res.status(404).json({
                error:"💫 No se han encontrado champions 💫",
                message: error.message
            });
        }
    } catch (error) {
        //! 62.- Controlamos si ha habido cualquier error durante la búsqueda en el catch general

        return res.status(404).json({
            error:"Ha habido un error en la búsqueda de champions 💤",
            message: error.message
        })
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 64.- Función GET BY NAME básicamente el funcionamiento es el mismo, solo que pasaremos como param el name
//? ---------------------------------------------------------------------------------------------------------

const getChampionByName = async(req,res,next) => {
    try {
        const {name} = req.params;

        const championByName = await Champion.find({name});

        if (championByName.length > 0){
            return res.status(200).json(championByName);
        } else {
            return res.status(404).json({
                error:"No se encontró el champion con ese nombre 👁‍🗨",
                message: error.message
            });
        }

    } catch (error) {
        return res.status(404).json({
            error:"Error en la búsqueda de champion 💢",
            message : error.message
        });
    }
};

//? ---------------------------------------------------------------------------------------------------------
//! 65.- Función UPDATE o PATCH nos permite modificar toda o parte de la información dentro de un objeto de la DB
//? ---------------------------------------------------------------------------------------------------------

const updateChampion = async (req,res,next) => {
    //! 66.- En primer lugar, como la imagen es susceptible de ser cambiada, la capturamos

    let catchImg = req.file?.path;

    //! 67.- Comenzamos el try, en este caso haciendo una sincronización de los index

    try {
        await Champion.syncIndexes();

        //! 68.- Como el champion lo cambiaremos pasando el id como param, lo capturamos del param y buscamos
        //! el champion asociado

        const {id} = req.params;
        const championById = await Champion.findById(id)

        //! 69.- A continuación vemos si se ha encontrado con un ifelse, guardamos la imagen antigua por si acaso
        //! e iremos capturando cada key en caso de encontrarla, controlando con operadores ternarios que
        //! en caso de encontrar nueva información en el body, la tomará y la asignará, y en caso de no haber,
        //! dejará la antigua información en esa misma key

        if (championById) {
            const oldImg = championById.image;

            const customBody = {
                _id: championById._id, //! 70.- Al id no le daremos la opción de ser modificado
                name: req.body?.name ? req.body?.name : championById.name, //! 71.- Encuentra información nueva?
                //! la cambia, y si no, pues deja la que tenía ya almacenada.
                age: req.body?.age ? req.body?.age : championById.age,
                image: req.file?.path ? catchImg : oldImg,
            }

            //! 72.- Los parámetros o keys que sean enums, los controlaremos mediante funciones que vamos a
            //! definir en la carpeta utils

            if(req.body?.gender){
                const resultGender = genderOk(req.body?.gender);
                customBody.gender = resultGender.check
                ? req.body?.gender
                : championById.gender;
            };

            if(req.body?.race){
                const resultRace = raceOk(req.body?.race);
                customBody.race = resultRace.check
                ? req.body?.race
                : championById.race;
            };

            //! 74.- Una vez ha actualizado los parámetros en nuestro objeto customBody, que sería nuestro
            //! champion provisional antes de subir la información al champion en la DB, intentamos actualizarlo
            //! mediante otro trycatch

            try {
                //! 75.- Con este método, buscamos el champion por id y le actualizamos la info con el
                //! customBody al cual hemos añadido toda la información del objeto, además controlaremos
                //! si hay una nueva imagen o no para borrar la antigua de cloudinary.
                await Champion.findByIdAndUpdate(id, customBody);

                if(req.file?.path){
                    deleteImgCloudinary(oldImg);
                };

                //?--------------------------------------------------------------------------------
                //! 76.- Ahora vamos a testear los cambios para comprobar que todo está ok
                //?--------------------------------------------------------------------------------

                //! 77.- En primer lugar asignamos a una variable nueva el champion en principio ya cambiado
                //! y sacamos todas las keys del req.body almacenándolas en un array que recorreremos

                const championByIdUpdate = await Champion.findById(id);

                const elementsUpdate = Object.keys(req.body);

                //! 78.- A continuación nos creamos un objeto test en el que podremos ir añadiendo información
                //! de cada testeo en cada key

                let test = {};

                //! 79.- Y recorremos todos los elementos a cambiar, comparando cada información en cada campo
                //! del req.body con la información del objeto (en principio) con la información ya cambiada.
                //! En caso de encontrar discordancias, almacena en el objeto test el nombre del campo que no
                //! se ha cambiado con el valor false, que luego mostraremos por consola. Además controlamos
                //! el path de la imagen para verificar que también se ha cambiado, pues es aparte.

                elementsUpdate.forEach((item) => {
                    if(championByIdUpdate[item] == req.body[item]){
                        test[item] = true;
                    } else {
                        test[item] = false;
                    }
                });

                if(req.file){
                    championByIdUpdate.image === req.file?.path
                    ? (test = {...test, file: true})
                    : (test = {...test, file: false})
                };

                //! 80.- Y ahora comprobamos que no hay ningún false en nuestro test mediante un recorrido
                //! que en caso de encontrar un false, añadirá 1 a nuestro contador, que será quien nos permita
                //! ver si ha habido al menos un error en los cambios de información

                let acc = 0;
                for (clave in test){
                    test[clave] == false && acc++;
                }

                if(acc > 0){
                    return res.status(404).json({
                        dataTest: test,
                        update: false
                    });
                } else {
                    return res.status(200).json({
                        champion : championByIdUpdate,
                        dataTest: test,
                        update: true
                    })
                }

                //?--------------------------------------------------------------------------------
                //! 81.- Fin del testeo, se nos mostrará por pantalla si se ha hecho bien o no y, en
                //! caso de haber error, dónde ha fallado
                //?--------------------------------------------------------------------------------

                //! 82.- Por último controlamos cada error que se ha ido acumulando para mostrar dónde
                //! falla en caso de fallar nuestro código

            } catch (error) {
                //error de actualización
                next(error);
                return (
                    res.status(404).json({
                        error: "❌ No se pudo actualizar la información del champion ❌",
                        message: error.message
                    }) && next(error)
                )
            }
        } else {
            //no se encontró id
            next(error);
            return (
                res.status(404).json({
                    error: "❌ No se encontró un champion con ese id ❌",
                    message: error.message
                }) && next(error)
            )
        }
    } catch (error) {
        //error método
        next(error);
        return (
            res.status(404).json({
                error: "❌ Hubo un error en la actualización del champion ❌",
                message: error.message
            }) && next(error)
        )
    }

}

//! 43.- Por último, exportamos la función create del controlador para poder usarla en la ruta
//! 58.- Iremos exportando todas las funciones que creemos en el controlador

module.exports = {createChampion , 
    getChampionById, 
    getAllChampions, 
    getChampionByName, 
    updateChampion,
}