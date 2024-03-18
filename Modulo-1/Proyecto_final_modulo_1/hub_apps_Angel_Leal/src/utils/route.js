import {Login, printTemplateDashboard, printPodekex, printGuess} from "../pages";
import { getUser } from "../global/state/globalState";

/* Controla las cargas de las diferentes páginas */
export const initControler = (pagesRender) => {
    switch(pagesRender){
        case undefined :
            console.log(localStorage.getItem(getUser().name));
            localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
            break;
        case "Dashboard":
            console.log("Vamos al Dash...");
            printTemplateDashboard();
            break;
        case "Login":
            console.log("Volviendo al login...");
            Login();
            break;
        case "Pokedex":
            console.log("Abriendo Pokedex");
            printPodekex();
            break;
        case "Guess":
            console.log("Abriendo juego guess");
            printGuess();
            break;
    }
};