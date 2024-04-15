import { Title } from "../Title/Title"
import "./Header.css"
import { NavLink } from 'react-router-dom'


export const Header = () => {
    return (
        <header>
            <Title texto="React Router V6"/>
            <nav>
                <NavLink to=""><p>Home</p></NavLink>
                <NavLink to="read"><p>Libros</p></NavLink>
                <NavLink to="songs"><p>Canciones</p></NavLink>
                <NavLink to="videogames"><p>Videojuegos</p></NavLink>
            </nav>
        </header>
    )
}