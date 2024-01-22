//*Iteración#1: Buscar el máximo

/* function sum(numberOne, numberTwo) {
    if(numberOne>numberTwo){
        return numberOne;
    }
    else {
        return numberTwo;
    }
} */

//*Iteración#2: Buscar la palabra más larga

/* const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
function findLongestWord(param) {
    let max = 0;
    let finalWord;
    for(let word of param){
        if (word.length > max){
            max = word.length;
            finalWord = word;
        }
    }
    return finalWord;
} */

//*Iteración#3: Calcular la suma

/* const numbers = [1, 2, 3, 5, 45, 37, 58];
function sumAll(param) {
    let sum = 0;
    for (let number of param){
        sum += number;
    }
    return sum;
} */

//*Iteración#4: Calcular el promedio

/* const numbers = [12, 21, 38, 5, 45, 37, 6];
function average(param) {
    let sum = 0;
    for (let number of param){
        sum += number;
    }
    return sum/param.length;
} */

//*Iteración#5: Calcular promedio de strings

/* const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
function averageWord(param) {
    let sum = 0;
    for (let el of param){
        if(typeof el == "string"){
            sum += el.length;
        }
        else{
            sum += el;
        }
    }
    return sum;
} */

//*Iteración#6: Valores únicos

const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
    ];
function removeDuplicates(param) {
    let arrayDef = [];
    for (let word of param){
        if(!arrayDef.includes(word)){
            arrayDef.push(word);
        }
    }
    return arrayDef;
}