import { game } from "../../utils";
import "./Guess.css";

const template = () => `<div class="center" id="guessPokemon">
<div id="titulo"><h2>¿A qué pokemon pertenece la silueta?</h2></div>
<div class="center" id="guessGame">
    <div id="imgCont">
    <img id="pkmnImgBlack" src="" alt="pokemon-silhouette"></div>
    <div class="center" id="textos">
    <input type="text" name="answer" id="answer" placeholder="Escribe una letra" maxlength="1" autocomplete="off">
    <button id="gameButton">Probar</button>
    <h3 id="solution"></h3>
    </div>
</div>
</div>`;


export const printGuess = () => {
    document.querySelector("main").innerHTML = template();
    game();
};