//Iteración#1: Buscar el máximo

/* function sum(numberOne, numberTwo) {
    if(numberOne>numberTwo){
        return numberOne;
    }
    else {
        return numberTwo;
    }
} */

//Iteración#2: Buscar la palabra más larga

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

//Iteración#3: Calcular la suma

const numbers = [1, 2, 3, 5, 45, 37, 58];
function sumAll(param) {
    let sum = 0;
    for (let number of param){
        sum += number;
    }
    return sum;
}