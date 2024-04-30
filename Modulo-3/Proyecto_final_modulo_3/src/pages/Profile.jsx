import { Outlet } from "react-router-dom"
import "./Profile.css"
import {NavProfile} from "../components"


export const Profile = () => {
    return (
        <>
            <NavProfile/>

            <div className="profileContent">
            
                <Outlet/>
                
            </div>
        </>
    )
}
