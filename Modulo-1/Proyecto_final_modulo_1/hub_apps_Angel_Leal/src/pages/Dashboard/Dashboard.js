import { initControler } from "../../utils";
import { getUserData } from "../../global/state/globalState";
import "./Dashboard.css";


const template = () => `
<div id="mainDash">
<div></div>
<button id="seePokedex"><img id="pokedex" src="https://miro.medium.com/v2/resize:fit:600/0*NsHVyfpJ2k7ixTAd" alt="imagen_pokedex"><p>Ver la pokedex</p>
</button>
<button id="adivinaElPokemon"><img id="adivina" src="https://m.media-amazon.com/images/I/71WkWKFRSWL.png" alt="imagen_adivina"><p>Adivina el Pokemon</p>
</button>
<div></div>
</div>
`;

/* Distintos eventos para los botones del Dashboard para que inicien las otras pantallas */
const addEventListener = () => {
    const navigatePokedex = document.getElementById("seePokedex");
    navigatePokedex.addEventListener("click", () => {
        initControler("Pokedex");
    });

    const navigateGuess = document.getElementById("adivinaElPokemon");
    navigateGuess.addEventListener("click", () => {
        initControler("Guess");
    });
}


export const printTemplateDashboard = () => {
    console.log();
    document.querySelector("main").innerHTML = template();
    document.querySelector("#navBar").style.display = "initial";
    /* Con la siguiente línea imprimimos en el header el nombre del user actual */
    document.querySelector("#welcome").innerHTML = `Bienvenido/a ${getUserData().name}`;
    document.querySelector("#logo").style.display = "flex";
    document.querySelector("#logo").style.paddingLeft = "100px";
    addEventListener();
}