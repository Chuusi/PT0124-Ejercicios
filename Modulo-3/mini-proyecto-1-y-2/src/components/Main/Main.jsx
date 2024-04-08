import "./Main.css"
import { Gallery } from "../Gallery/Gallery"
import { Subtitle } from "../Subtitle/Subtitle"

export const Main = () => {
    const subtitle= "Foto, nombre y origen de cada personaje, en un futuro proyecto aparecerán también los personajes muertos o en paradero desconocido."
    
    return (
        <main>
            <Subtitle texto={subtitle}/>
            <Gallery />
        </main>
    )
}