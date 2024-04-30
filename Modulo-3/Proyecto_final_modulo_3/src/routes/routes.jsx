import { createBrowserRouter } from "react-router-dom";
import  App  from "../App"
import { Home, Login, Register, CheckCode, Dashboard, Profile, ForgotPassword, FigureUserPage } from "../pages";
import { Protected, ProtectedCheckChildren } from "../components/ProtectedRoutes";
import { ChangePassword } from "../pages/ChangePassword";
import { FormProfile } from "../pages/FormProfile";





export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/register",
                element: <Register/>
            },
            {
                path:"/login",
                element: <Login/>
            },
            {
                path:"/forgotPassword",
                element: <ForgotPassword />
            },
            {
                path:"/verifyCode",
                element:(
                    <ProtectedCheckChildren>
                        <CheckCode/>
                    </ProtectedCheckChildren>
                ),
            },
            {
                path:"/dashboard",
                element: (
                    <Protected>
                        <Dashboard/>
                    </Protected>
                ),
            },
            {
                path:"/profile",
                element: (
                    <Protected>
                        <Profile/>
                    </Protected>
                ),
                children: [
                    {
                        path:"/profile",
                        element:<FigureUserPage/>,
                        
                    },
                    {
                        path:"/profile/changePassword",
                        element: (
                            <Protected>
                                <ChangePassword/>
                            </Protected>
                        )
                    },
                    {
                        path:"/profile/update",
                        element: (
                            <Protected>
                                <FormProfile />
                            </Protected>
                        )
                    }
                ]
            }
        ]
    }
])