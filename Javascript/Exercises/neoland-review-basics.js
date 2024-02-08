//* Iteración#1: Mix for e includes

/* const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]
let categories = [];
for(let movie of movies){
    for(categorie of movie["categories"]){
        if(!categories.includes(categorie)){
            categories.push(categorie)
        }
    }
} */

//* Iteración#2: Mix Fors

/* const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]

let calcularMedia = function(users){
    let total = 0;
    let count = 0;
    for(let user of users){
        for(let sound in user["favoritesSounds"]){
            total += user["favoritesSounds"][sound].volume;
            count++;
        }
        
    }
    return total/count;
} */

//* Iteración#3: Mix Fors

/* const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]

let conteoFavoritos = function(users){{
    let cuentaFavs = {};
    for(let user of users){
        for(let favoriteSound in user["favoritesSounds"]){
            if(favoriteSound in cuentaFavs){
                cuentaFavs[favoriteSound]++;
            }
            else{
                cuentaFavs[favoriteSound] = 1;
            }
        }
    }
    return cuentaFavs;
}} */

//* Iteración#4: Métodos findArrayIndex

/* let arrayEjemplo = ['Caracol', 'Mosquito', 'Salamandra', 'Ajolote'];
let findArrayIndex = function(array, text){
    return array.indexOf(text);
}

console.log(findArrayIndex(arrayEjemplo, "Mosquito"));
console.log(findArrayIndex(arrayEjemplo, "Ajolote"));
console.log(findArrayIndex(arrayEjemplo, "Cucaracha")); */

//* Iteración#5: Función rollDice

//let rollDice = (numCaras) => (Math.floor(Math.random() * (numCaras))+1);
//sumamos 1 para que el resultado sea entre 1 y numCaras exacto

//* Iteración#6: Función swap

let arrayTest = ['Mesirve', 'Cristiano Romualdo', 'Fernando Muralla', 'Ronalguiño'];
let swap = function (array, index1, index2) {
    let newArray = [...array];
    let saveValue = newArray[index1];
    newArray[index1] = newArray[index2];
    newArray[index2] = saveValue;
    return newArray;
};