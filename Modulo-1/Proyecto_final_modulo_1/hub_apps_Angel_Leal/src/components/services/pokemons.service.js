import { axiosUtil } from "../../utils/axios";

/* Trae los pokemons de la api a traves de AXIOS */
export const getByIdPokemon = async (id) => {
    const optionsRequest = {
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    };

    return await axiosUtil(optionsRequest);
};