import { setData } from "../global/state/globalState";
import { getByIdPokemon } from "../components/services/pokemons.service";
import { Paginacion } from "./paginacion";
import { typePokemon } from "./typePokemon";

let dataGlobal;

/* TRAE LOS DATOS DE LA API Y LOS ALMACENA EN UN ARRAY */
export const dataPokemon = async () => {
    const arrayPokemons = [];
    for(let i=1; i<151; i++){
        arrayPokemons.push(await getByIdPokemon(i));
    }
    
    /* Devuelve el array mapeado con la información que interesa */
    return dataMap(arrayPokemons);
}

/* Almacenamos los datos que queramos mediante el mapeo de los datos obtenidos de la API */
const dataMap = (data) => {
    const filterData = data.map((pokemon) => ({
        name: pokemon.name,
        image_front: pokemon.sprites.versions["generation-v"]["black-white"].front_default,
        image_back: pokemon.sprites.versions["generation-v"]["black-white"].back_default,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types,
        id: pokemon.id,
    }));

    const types = typePokemon(filterData);
    dataGlobal={
        pokemonData: filterData,
        type: types,
    };

    return dataGlobal;
};

/* Función para filtrar los pokemons por tipos o nombre */
export const filterPokemon = (filterDataInputButton, donde) => {
    switch(donde){
        case "type":
            {
                const filterData = dataGlobal.pokemonData.filter((pokemon) => pokemon.type[0].type.name
                .toLowerCase()
                .includes(filterDataInputButton.toLowerCase())
                );
                
                if(filterData.length === 0){
                    const filterData = dataGlobal.pokemonData.filter((pokemon) => pokemon.type[1]?.type.name
                    .toLowerCase()
                    .includes(filterDataInputButton.toLowerCase())
                    );
                    
                    Paginacion(filterData, 3);
                }
                else {
                    Paginacion(filterData, 3);
                }
            }
            break;
        
        case "name":
            {
                const filterData = dataGlobal.pokemonData.filter((pokemon) => pokemon.name
                .toLowerCase()
                .includes(filterDataInputButton.toLowerCase())
                );

                if(filterDataInputButton == "") {
                    Paginacion(filterData, 25);
                }
                else {
                    Paginacion(filterData, 5);
                }
            }
            break;
    }
};

export const getInfo = async() =>{
    console.log("poniendo al día la info...");
    const data = await dataPokemon();
    setData(data);
}

getInfo();