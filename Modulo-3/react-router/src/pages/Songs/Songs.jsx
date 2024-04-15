import "./Songs.css"
import { hobbies } from "../../components"

export const Songs = () => {
    return (
        <div>
            <h2>Canciones</h2>
            <ul id="Sgallery">
            {hobbies.songsHeard.map((song) => 
                <li key={song}>{song}</li>
            )}
            </ul>
        </div>
    )
}