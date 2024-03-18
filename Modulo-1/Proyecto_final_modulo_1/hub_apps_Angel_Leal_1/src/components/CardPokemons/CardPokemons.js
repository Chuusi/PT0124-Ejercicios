import { getData, getUserData, setUserData } from "../../global/state/globalState";
import "./CardPokemons.css"

/* Función que imprimirá tantas cartas como elementos encuentre en el mapeo */
export const CardsPokemons = (data) => {
    const appUser = getUserData();
    
    document.getElementById("galleryPokemon").innerHTML = ``;

    data.map((pokemon) => {
        const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`;

        const templateFigure = `
        <figure class=${classCustomType} id="${pokemon.id}">
            <div id="img-fav">
                <img id="pokemonImg" src="${pokemon.image_front}" alt="${pokemon.name}">

                <div class="favorites ${appUser.fav.includes(pokemon.id.toString()) ? "like" : "nolike"}">
                    <span class="unfavorite material-symbols-outlined">
                    heart_plus
                    </span>
                    <span class="favorite material-symbols-outlined">
                    favorite
                </div>
                </span>
            </div>
            <h2 id="pokemonName">${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h2>
            </figure>
        `;
        document.getElementById("galleryPokemon").innerHTML += templateFigure;

        addListeners(data);
    });
};

const addListeners = (data) => {
    const appUser = getUserData();

    /* Añade o quita la clase "like" y "nolike" para modificar el elemento que se muestra al clickar en el 
    botón para añadir a favoritos */
    const spanAll = document.querySelectorAll("span");
    spanAll.forEach((span) => {
        span.addEventListener("click", (e) => {
            if(appUser.fav.includes(e.target.closest("figure").id)){
                const appUser = getUserData();
                const newFavArray = [];
                appUser.fav.forEach((id) => {
                    if(e.target.closest("figure").id != id) newFavArray.push(id);
                });
                setUserData({
                    ...appUser,
                    fav: newFavArray,
                });
                e.target.parentNode.classList.toggle("like");
                e.target.parentNode.classList.toggle("nolike");
                console.log(newFavArray);

            }

            else{
                const appUser = getUserData();
                appUser.fav.push(e.target.closest("figure").id);
                setUserData(appUser);
                e.target.parentNode.classList.toggle("like");
                e.target.parentNode.classList.toggle("nolike");
                
            }
        });
    });

    /* añade o quita la clase "back" a la imagen en caso de clickar para que muestre la imagen del
    pokemon de espaldas */
    const pokemonImages = document.querySelectorAll("#pokemonImg");
    const pokemons = getData();
    pokemonImages.forEach((img) => {
        img.addEventListener("click", (e) => {
            console.log(pokemons);
            
            const ide = e.target.closest("figure").id;
            console.log(e.target.closest("figure").id);
            img.classList.toggle("back");
            if(img.classList.contains("back")){
                img.src = `${pokemons.pokemonData[ide-1].image_back}`;
            }
            else{
                img.src = `${pokemons.pokemonData[ide-1].image_front}`;
    
            }
        });
    })
    
    
};
