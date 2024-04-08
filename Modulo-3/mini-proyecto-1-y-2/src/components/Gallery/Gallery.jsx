import "./Gallery.css"
import { CharacterCard } from "../CharacterCard/CharacterCard"
import { data } from "../../data/data";

const rickData = await data();

export const Gallery = () => {

    return (
        <div  id="container-gallery">
            <ul>
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
            </ul>
        </div>
    )
}