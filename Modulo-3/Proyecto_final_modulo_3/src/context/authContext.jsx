import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    //! Crear el estado del usuario, con el estado iniciado en función de lo que haya en el localStorage. Si no hay nada, se inicia en null

    const [ user, setUser ] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    })

    //! Estado allUser que guardará la info del usuario cuando el register de res 200 y podamos tirar de ella

    const [ allUser, setAllUser ] = useState({
        data:{
            confirmationCode: "",
            user:{
                password:"",
                email: "",
            },
        },
    });

    const [updateUser, setUpdateUser] = useState({
        data:{
            user:{
                name: "",
                email: "",
                image: "",
            }
        }
    })

    //! Función puente para cuando tengamos problemas de asincronía

    const bridgeData = (state) => {
        const data = localStorage.getItem("data");
        const user = localStorage.getItem("user");
        const dataJson = JSON.parse(data);
        const userJson = JSON.parse(user);
        switch (state) {
            case "ALLUSER":
                setAllUser(dataJson);
                localStorage.removeItem("data");
                break;

            case "UPDATEUSER":
                setUpdateUser(userJson);
                console.log(userJson);

                break;
            
            default:
                break;
        };
    };

    //! Función login

    const login = (data) => {
        localStorage.setItem("user", data);
        const parseUser = JSON.parse(data);
        setUser(parseUser);
    }

    //! Función logout

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    //! value memorizará los datos con useMemo

    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        allUser,
        setAllUser,
        bridgeData,
        updateUser,
        setUpdateUser,
    }), [user, allUser, updateUser]);

    //! Devolvemos el componente del contexto
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

};

//! Creamos y exportamos un custom hook para usar el contexto

export const useAuth = () => useContext(AuthContext)