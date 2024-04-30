import { NavLink } from "react-router-dom";
import "./Header.css"
import { useAuth } from "../context";

export const Header = () => {
    
    //! Nos traemos user (state) y logout (función) del contexto que hemos creado previamente
    const {user,logout} = useAuth();
    
    
    return (
        
        <>
        <header>
            <div className="titleFatherContainer">
            <span className="material-symbols-outlined logo">
            guardian
            </span>
            <div className="titleContainer">
                <h1 className="titleHeader">{user == null ? "PÁGINA DE USUARIO" : "USUARIO: "+ user.user}</h1>
                <h1 className="titleHeaderBlack">{user == null ? "PÁGINA DE USUARIO" : "USUARIO: "+ user.user}</h1>
            </div>
            </div>

            <nav>
                {/** En caso de no haber user en el estado, se mostrará este icono que nos llevará a la ruta /login. Pero si ya hay un user en el contexto, no se muestra el icono */}
                {user == null && (
                    <NavLink to="/login">
                        <button className="btn-custom">
                            Login<span class="material-symbols-outlined">login</span>
                        </button>
                    </NavLink>
                )}

                {/** En este caso es lo mismo pero muestra el icono en caso de haber un user en el contexto */} 
                {user != null ? (
                    <NavLink to="/dashboard">
                        <button className="btn-custom">
                            Dashboard<span class="material-symbols-outlined">dashboard</span>
                        </button>
                    </NavLink>
                ) : null}

                {/** Este icono siempre se mostrará para ir a home */} 
                <NavLink to="/">
                    <button className="btn-custom">
                        Home<span class="material-symbols-outlined">home</span>
                    </button>
                </NavLink>

                {/**Y siempre que haya un user en el contexto, se mostrará un icono de logout al que añadimos el evento onClick que llamará a la función logout del contexto */}
                {user != null && (
                    <NavLink>
                        <button className="btn-custom" onClick={() => logout()}>
                            Logout<span class="material-symbols-outlined">logout</span>
                        </button>
                    </NavLink>
                    
                    
                )}

                {/** Siempre que haya un user, se mostrará su imagen almacenada en el contexto con su nombre, y al clicar en el, te llevará a la ruta /profile */}
                {user != null ? (
                    <NavLink to="/profile">
                        <img
                            className="profileCircle"
                            src={user.image}
                            alt={user.user}
                        />
                    </NavLink>
                ) : null}
            </nav>
        
        </header>
        <div className="whiteContainer"></div>
        </>
    )
}
