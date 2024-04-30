import { Link } from "react-router-dom";
import { useAuth } from "../context"
import { useDeleteUser } from "../hooks";
import "./NavProfile.css"


export const NavProfile = () => {
    
    const {setUser, setDeleteUser} = useAuth();
    
    return (
        <div className="navPro">
            <div className="containerNavProfile">
                <Link to="/profile/changePassword">
                    <div className="iconNav">
                        <span className="material-symbols-outlined iconNavInside">
                        passkey
                        </span>
                    </div>
                </Link>

                <Link to="/profile/update">
                    <div className="iconNav">
                        <span className="material-symbols-outlined iconNavInside">
                        manage_accounts
                        </span>
                    </div>
                </Link>
                <Link>
                    <div 
                        className="iconNav"
                        onClick={() => useDeleteUser(setUser, setDeleteUser)}>
                        <span className="material-symbols-outlined iconNavInside">
                            person_cancel
                        </span>
                    </div>
                </Link>
                
            </div>
        </div>
        
    )
}
