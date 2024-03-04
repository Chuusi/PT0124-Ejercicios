//! 73.- Nos creamos las dos funciones para controlar los enums que tenemos y las exportamos

const genderOk = (gender) => {
    const genders = ["masculino","femenino","otro"];
    if(genders.includes(gender)){
        return {
            check: true,
            gender
        }
    } else {
        return {
            check: false,
        }
    }
};

const raceOk = (race) => {
    const races = ["ascendidos","celestial","cyborg","darkin","demonios","humanos","minotauros","nacidos en el hielo","renacido","vastaya","yeti","yordle"];
    if(races.includes(race)){
        return {
            check: true,
            race
        }
    } else {
        return {
            check: false
        }
    }
}

module.exports = {genderOk, raceOk}