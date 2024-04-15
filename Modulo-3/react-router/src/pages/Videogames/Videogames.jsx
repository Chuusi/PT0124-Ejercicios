import "./Videogames.css"
import { hobbies } from "../../components/Hobbies/Hobbies"

export const Videogames = () => {
    return (
        <div id="videogames">
            <h2>Videojuegos</h2>
            <div id="VGgallery">
            {hobbies.videogames.map((vg) => 
                <figure key={vg.name}>
                    <img src={vg.image} alt={vg.name} />
                    <h2>{vg.name}</h2>
                    <h3>{vg.year}</h3>
                    <h3>Tipo:{vg.type.map((type) => " " + "'"+type+"'")}.</h3>
                </figure>
            )}
        </div>
        </div>
        
    )
}
