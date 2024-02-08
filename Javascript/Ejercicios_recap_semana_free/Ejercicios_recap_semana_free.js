//! EJERCICIOS RECAP SEMANA FREE

//* Ejercicio 1

for(let i = 5; i<=50; i+=5){
    console.log(i);
}

//* Ejercicio 2

for(let i=100; i>=0; i-=5){
    console.log(i);
}

//* Ejercicio 3

let arrayAleatorio = [];
for(let i = 0; i<10; i++){
    arrayAleatorio.push(Math.floor(Math.random() * 100)+1);
}
console.log(arrayAleatorio);

//* Ejercicio 4

let	colores	=	["azul", "verde", "rosa", "naranja", "rojo", "marron"];
let tercerElemento = colores[2];
console.log(tercerElemento);

//* Ejercicio 5

console.log(colores[0][0]);

//* Ejercicio 6

let	frase	=	["posiciones", "se cuentan", "Las",	"array", "cero.",	
"a partir",	"del"];
console.log(`${frase[2]} ${frase[0]} ${frase[6]} ${frase[3]} ${frase[1]} ${frase[5]} ${frase[4]}`);

//* Ejercicio 7

let alumnos1 = ["Sebas", "Sandra", "Liviu"];
let alumnos2 = ["Javier", "Raúl", "Elena"];
let unirArrays = function (array1,array2) {
    return array1.concat(array2);
}
console.log(unirArrays(alumnos1,alumnos2));

//* Ejercicio 8

function pushearElementoEnOtroArray(array1,array2) {
    array2.push(array1.pop());
}
pushearElementoEnOtroArray(alumnos1,alumnos2);
console.log(alumnos2);

//* Ejercicio 9

let	array1 = [1, 2, [3, 4]]; 	
let	array2 = [1, 2, [3, 4, [5, 6]]];

array1 = array1.flat();
console.log(array1);

array2 = array2.flat(1);
console.log(array2);

//* Ejercicio 10

let	coloresOrden = ["azul", "verde", "rosa", "naranja", "rojo", "marron"];
coloresOrden = coloresOrden.sort().reverse();
console.log(coloresOrden);

//* Ejercicio 11

let	numeros = [40, 100, 1, 5, 25, 10];
numeros = numeros.sort(function(a, b){return a - b});
console.log(numeros);

//* Ejercicio 12

let arrayFibonacci = [];
function fibonacciHastaN(n) {
    let x = 0;
    arrayFibonacci.push(x);
    let y = 1;
    arrayFibonacci.push(y)
    let reserva;
    while(arrayFibonacci.length<n){
        reserva = y;
        y += x;
        x = reserva;
        arrayFibonacci.push(y);
    }
}
fibonacciHastaN(20);
console.log(arrayFibonacci);

//* Ejercicio 13

function deCelsiusAFarenheit(celsius) {
    return celsius*1.8 + 32;    
}
console.log(deCelsiusAFarenheit(10));

//* Ejercicio 14

let deCelsiusAFarenheitArrow = (celsius) => celsius*1.8 + 32;
console.log(deCelsiusAFarenheitArrow(30));

//* Ejercicio 15

function comprobarMayusculasMinusculas(frase) {
    if(frase == frase.toUpperCase()){
        return "La frase está entera en mayúsculas: "+frase;
    }
    else if(frase == frase.toLowerCase()){
        return "La frase está en minúsculas: "+frase;
    }
    else{
        return "La frase mezcla mayúsculas y minúsculas: "+frase;
    }
}
console.log(comprobarMayusculasMinusculas("Hoooola")); 

//* Ejercicio 16

function comprobarPalindromo(frase) {
    let fraseInvertida = [];
    let fraseNormal = [];
    for(let i=0; i<frase.length; i++){
        if(frase[i].match(/[A-Za-z]/)){
            fraseNormal.push(frase[i].toLowerCase());
            fraseInvertida.unshift(frase[i].toLowerCase());
        }
    }
    fraseNormal = fraseNormal.join("");
    fraseInvertida = fraseInvertida.join("");
    if (fraseNormal == fraseInvertida) {
        return "La frase ES un palíndromo"
    } else {
        return "La frase NO es un palíndromo"
    }
}
console.log(comprobarPalindromo("Dabale arroz a la zorra el abad"));
console.log(comprobarPalindromo("el abad no le da nada a la zorra"));

//* Ejercicio 17

const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
let diasM = [];
diasM = dias.filter((dia) => dia[0] == "m");
console.log(diasM);

//* Ejercicio 18

let	num = [100, 2, 20, 35, 4, 44];
num = num.sort((a,b) => a-b).filter((numero) => numero < 10);
console.log(num);

//* Ejercicio 19

let	nums = [100, 2, 20, 35, 4, 44];
let	numSuma = nums.reduce((suma, num) => suma + num);
console.log(numSuma);

//* Ejercicio 20 Dos formas

let letras1 = ["a","b","c","d","e"];
let letras2 = ["d","e","f","g","h"];
function juntarArraysSinDuplicados(array1,array2) {
    let arrayJuntos = [];
    for(let i = 0; i<array1.length; i++){
        if(!array2.includes(array1[i])){
            arrayJuntos.push(array1[i]);
        }
    }
    for(let i = 0; i<array2.length; i++){
        if(!array1.includes(array2[i])){
            arrayJuntos.push(array2[i]);
        }
    }
    return arrayJuntos;
}
console.log(juntarArraysSinDuplicados(letras1,letras2));


let juntarSinDuplicados = (array1,array2) => array1.concat(array2).filter(el => !array1.includes(el) || !array2.includes(el));
console.log(juntarSinDuplicados(letras1,letras2));

//* Ejercicio 21

let fruta = {};
fruta.tipo = "cítrica";
fruta.color = "amarillo";
fruta.peso = 0.2;
console.log(fruta);

//* Ejercicio 22

let	jugadores = [	
    {nombre: "Ana", puntos: [21,3,5,78,25], temporada: false}, 	
    {nombre: "Pedro", puntos: [55,66,77,55,66], temporada: true}, 
    {nombre: "Juan", puntos: [12,83,40,65,10], temporada: true},
    {nombre: "Marta", puntos: [24,90,36,78,20], temporada: true}
];

function mejorJugador(lista) {
    let puntuacionMedia = 0;
    let mayorPuntuacion = 0;
    let mejorJugador = {};
    for(let i = 0; i<lista.length; i++){
        puntuacionMedia = 0;
        for(let j = 0; j<lista[i].puntos.length; j++){
            puntuacionMedia+=lista[i].puntos[j];
        }
        puntuacionMedia/=lista[i].puntos.length;
        if (puntuacionMedia>mayorPuntuacion) {
            mayorPuntuacion = puntuacionMedia;
            mejorJugador = lista[i];
        }
    }
    return `${mejorJugador.nombre} es el MVP con ${mayorPuntuacion.toFixed(2)} puntos de media ${mejorJugador.temporada ? "y SI está inscrito en la siguiente temporada" : "y NO está en la siguiente temporada"}`;
}
console.log(mejorJugador(jugadores));

//* Ejercicio 23

let estudiante = {Bea: 5, Sebas: 9, Laura: 5, Elena: 8, Liviu: 6, Raul: 4, Angel: 2};
function calcularMedia(estudiantes) {
    let sumaNotas = 0;
    let media;
    let resultadoAlumnos = {};
    for(let estudiante in estudiantes){
        sumaNotas += estudiantes[estudiante];
    }
    media = sumaNotas/Object.keys(estudiantes).length;
    media *= 1.1;
    media = Math.floor(media);
    console.log(media);
    for(let estudiante in estudiantes){
        if (estudiantes[estudiante] >= 5) {
            resultadoAlumnos[estudiante] = `Aprobado con un ${estudiantes[estudiante]*media/10} sobre ${media}`
        } else {
            resultadoAlumnos[estudiante] = `Suspenso con un ${estudiantes[estudiante]*media/10} sobre ${media}`
        }
    }
    return resultadoAlumnos;
}
console.log(calcularMedia(estudiante));

//* Ejercicio 24

const trabajadores = {	
    Pedro: {	
        puesto: 'empleado',	
        edad: 40	
    },	
    Ana: {	
        puesto: 'becario',	
        edad: 34	
    },	
    Mike: {	
        puesto: 'becario',	
        edad: 37	
    },	
    Oscar: {	
        puesto: 'empleado',	
        edad: 35	
    },	
    Juan: {	
        puesto: 'becario',	
        edad: 29	
    },	
    Marta: {	
        puesto: 'jefe',	
        edad: 26	
    },	
    Maria: {	
        puesto: 'empleado',	
        edad: 28	
    },	
    Pablo: {	
        puesto: 'jefe',	
        edad: 36	
    },	
};

function ordenarTrabajadores(trabajadores) {
    let jefes = 0, empleados = 0, becarios = 0;
    let trabajadoresOrdenado = [], ordenandoJ = [], ordenandoE = [], ordenandoB = [];
    for(let trabajador in trabajadores){
        if(trabajadores[trabajador].puesto == 'jefe'){
            trabajadores[trabajador].nombre = trabajador;
            trabajadoresOrdenado.unshift(trabajadores[trabajador]);
            jefes++;
        }
        else if (trabajadores[trabajador].puesto == 'becario'){
            trabajadores[trabajador].nombre = trabajador;
            trabajadoresOrdenado.push(trabajadores[trabajador]);
            becarios++;
        }
        else{
            trabajadores[trabajador].nombre = trabajador;
            trabajadoresOrdenado.splice(jefes,0,trabajadores[trabajador]);
            empleados++;
        }
    }
    ordenandoJ = trabajadoresOrdenado.splice(0,jefes).sort(function (a,b) {
        a = a.edad;
        b = b.edad;
        return a-b;
    });
    ordenandoE = trabajadoresOrdenado.splice(0,empleados).sort(function (a,b) {
        a = a.edad;
        b = b.edad;
        return a-b;
    });;
    ordenandoB = trabajadoresOrdenado.splice(0,becarios).sort(function (a,b) {
        a = a.edad;
        b = b.edad;
        return a-b;
    });;
    trabajadoresOrdenado = [...ordenandoJ, ...ordenandoE, ...ordenandoB];
    return trabajadoresOrdenado;
}
console.log(ordenarTrabajadores(trabajadores));

//! En este último ejercicio he optado por devolver una lista en lugar de un objeto, ya que un objeto de por si no es algo ordenado por definición. Para suplir la falta de nombre dentro del objeto, me he servido del key de cada uno de ellos para añadirlo dentro de cada objeto con la key "nombre".