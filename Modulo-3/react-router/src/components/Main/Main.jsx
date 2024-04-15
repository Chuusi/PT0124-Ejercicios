import "./Main.css"
import { Outlet } from 'react-router-dom'

export const Main = () => {
    return (
        <main>
            <Outlet />
        </main>
    )
}