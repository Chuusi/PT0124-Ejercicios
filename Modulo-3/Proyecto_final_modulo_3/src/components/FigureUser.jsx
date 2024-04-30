
import "./FigureUser.css"

export const FigureUser = (user) => {
    
    console.log("USER DEL FIGURE", user);
    return (
        <figure className="figureUser">
            <img className="image_figure_user" src={user.user.image} alt={'user image'} />
            <h3>Nombre: {user.user.user}</h3>
            <h4>Email: {user.user.email}</h4>
        </figure>
    )
}


