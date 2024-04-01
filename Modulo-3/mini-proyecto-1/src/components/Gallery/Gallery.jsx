import "./Gallery.css"
import { CharacterCard } from "../CharacterCard/CharacterCard"
import { data } from "../../data/data";

const rickData = await data();

export const Gallery = () => {

    return (
        <div>
            <h1 id="title-gallery">Lista de personajes de Rick y Morty vivos</h1>
            <div id="container-gallery">
                {rickData.map((character) => character.status == "Alive" ?
                    <CharacterCard 
                    id={character.id}
                    key={character.id} 
                    name={character.name} 
                    image={character.image}
                    status={character.status}
                    origin={character.origin}
                    />
                    : ""
                )} 
            </div>
        </div>
    )
}