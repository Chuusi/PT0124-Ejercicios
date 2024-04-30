import React from "react";
import useDebounce from "./useDebounce";

const usePokemonCollection = () => {
    const [filter, setFilter] = React.useState('ditto');
    

    const [pokemonCollection, setPokemonCollection] = React.useState([]);

    const loadPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${filter}`)
        .then((response) => response.json())
        .then((json) => setPokemonCollection([json]));
    };

    return { filter, setFilter, pokemonCollection, loadPokemon };
};


export const CodeCustomHook = () => {
    const { filter, setFilter, pokemonCollection, loadPokemon } = usePokemonCollection();
    const debouncedValue = useDebounce(filter, 2000)

    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    React.useEffect(() => {
        loadPokemon();
    }, [debouncedValue]);

    return (
        <div>
        <input value={filter} onChange={handleChange} />
        <ul>
            {pokemonCollection.map((pokemon, index) => (
            <li key={index}>
                <h1>{pokemon.name}</h1>
                <img src={pokemon?.sprites?.front_default} alt={pokemon?.name ? pokemon.name : "Pokemon not found"} />
            </li>
            ))}
        </ul>
        </div>
    );
};

