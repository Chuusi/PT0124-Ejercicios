import { FigureUser } from "../components";
import { useAuth } from "../context"
import "./FigureUserPage.css"

export const FigureUserPage = () => {
    
    const {user} = useAuth();

    return (
        
        <FigureUser user={user}/>
        
    )
}
