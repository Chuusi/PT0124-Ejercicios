import { dataPokemon } from "./dataPokemon";
import { initControler } from "./route";

const pokemons = await dataPokemon();

/* Función que nos devuelve un objeto con una imagen y un nombre de un pokemon obtenido de la API */
export const randomPokemon = () => {
    const id = Math.floor(Math.random()*151+1);
    const pokemonToGuess = {
        img : pokemons.pokemonData[id].image_front,
        name : pokemons.pokemonData[id].name,
    };
    return pokemonToGuess;
};



/* Lógica para el juego de adivinar el pokemon primero obtenemos un pokemon aleatorio y ponemos su imagen
en negro, se crea una variable "trys" con tantas "_" como letras tenga el nombre */
export const game = () => {
    const pokemonToGuess = randomPokemon();
    document.getElementById("pkmnImgBlack").src = `${pokemonToGuess.img}`;
    const solution = pokemonToGuess.name;
    let trys = "";
    const button = document.getElementById("gameButton");
    const answer = document.getElementById("answer");
    for(let i = 0; i<solution.length; i++){
        trys += "_";
    }

    document.getElementById("solution").textContent = trys;

    /* Vada vez que pulse el botón probar, comprobará si la letra está en el nombre del pokemon, en cuyo caso
    la cambiará en la cadena "trys" que imprimirá bajo el botón */
    button.addEventListener("click", (e) => {
        let trying = answer.value;
        if(solution.includes(trying)){
            for(let i = 0; i<solution.length; i++){
                if(solution[i] == trying){
                    trys = trys.split("");
                    trys.splice(i,1,trying);
                    trys = trys.join("");
                    console.log(trys);
                    document.getElementById("solution").textContent = trys;
                }
            }
            document.getElementById("answer").value="";
            document.getElementById("answer").style.border="4px solid green";
            document.getElementById("answer").placeholder="Bien hecho!";

        }
        else{
            document.getElementById("answer").value="";
            document.getElementById("answer").style.border="4px solid red";
            document.getElementById("answer").placeholder="Intenta de nuevo";
        };
        trys==solution ? setTimeout(restart, 2000) : "";
    });
    /* Misma lógica pero cuando se pulse la tecla enter */
    answer.addEventListener("keypress", (e) => {
        let trying = answer.value;
        if (e.key === "Enter"){
            if(solution.includes(trying)){
                for(let i = 0; i<solution.length; i++){
                    if(solution[i] == trying){
                        trys = trys.split("");
                        trys.splice(i,1,trying);
                        trys = trys.join("");
                        console.log(trys);
                        document.getElementById("solution").textContent = trys;
                    }
                }
                document.getElementById("answer").value="";
                document.getElementById("answer").style.border="4px solid green";
                document.getElementById("answer").placeholder="Bien hecho!";

            }
            else{
                document.getElementById("answer").value="";
                document.getElementById("answer").style.border="4px solid red";

                document.getElementById("answer").placeholder="Intenta de nuevo";
            };
            trys == solution ? document.getElementById("pkmnImgBlack").style.filter="brightness(100%)" : "";
            trys==solution ? setTimeout(restart, 2000) : "";
    }});
};

/* Lanza un mensaje mediante el cual podremos reiniciar el juego en caso de pulsar Aceptar */
const restart = () => {
        if(confirm("BIEN HECHO! ¿Quieres jugar otra vez?")){
            initControler("Guess");
        } else {
            initControler("Dashboard");
        }
};