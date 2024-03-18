import {PrintButton} from "../../components";
import {getData} from "../../global/state/globalState";
import { Paginacion, filterPokemon, initControler } from "../../utils";
import "./Pokedex.css";

const template = () => `
<div id="pokedex">
    <div id="filterContainer">
        <div id="filterButton"></div>
        <input 
            type="text" 
            name="inputPokemon" 
            id="inputPokemon"
            placeholder="Buscar Pokemon (Ej: Pikachu)"
        >
        <button id="resetFilter">Reset filter</button>
    </div>
    <div id="paginacion"></div>
    <div id="galleryPokemon"></div>
    </div>
`;

const dataService = async () => {
    const getDataPokemon = getData();
    const { pokemonData, type} = getDataPokemon;
    addListeners();
    PrintButton(type);
    Paginacion(pokemonData, 25);
}

const addListeners = () => {
    /* Filtro por nombre del pokemon */
    const inputPokemon = document.getElementById("inputPokemon");
    inputPokemon.addEventListener("input", (e) => {
        filterPokemon(e.target.value, "name");
    });
    /* Botón para reiniciar los filtros a 0, vuelve a imprimir la Pokedex */
    const resetFilter = document.getElementById("resetFilter");
    resetFilter.addEventListener("click", (e) => {
        initControler("Pokedex");
    });
};




export const printPodekex = () => {
    document.querySelector("main").innerHTML = template();
    dataService();
}