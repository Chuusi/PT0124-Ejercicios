import { Subtitle } from "../Subtitle/Subtitle";
import { Image } from "../Image/Image";
import "./Main.css"

export const Main = () => {
    return (
        <main>
            <Subtitle texto="Este texto, junto con la imagen formarán el main" />
            <Image 
                src="https://uploads.toptal.io/blog/image/123158/toptal-blog-image-1495787008161-8b034566c672e800931b049709857f08.jpg"
                alt="Esquema componentes"
                width="500"
                height="400"
            />
        </main>
    )
}