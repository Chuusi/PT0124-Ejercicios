import { Title } from "../Title/Title"
import "./Header.css"

export const Header = () => {
    const title = "Lista de personajes vivos de Rick y Morty"
    return (
        <header className="center">
            <Title texto={title}/>
        </header>
    )
}