import { useEffect, useState } from "react";
import "./Login.css"
import { loginUserService } from "../services/user.service";
import { useLoginError } from "../hooks";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";

export const Login = () => {
    
    //! ESTADOS
    
    const {register, handleSubmit} = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [loginOk, setLoginOk] = useState(false);
    const {login, setUser} = useAuth();
    

    //! Función que gestiona la data del formulario

    const formSubmit = async(formData) => {
        setSend(true);
        setRes(await loginUserService(formData));
        setSend(false);
    }
    
    //! useEffect para gestión de respuestas

    useEffect(() => {
        console.log("Login OK 🎎", res);
        useLoginError(res, setRes, login, setLoginOk)
    }, [res]);

    //! Checkeamos que un usuario esté logueado y verificado. Puede estar logueado sin estar checkeado, pero no le dejamos acceso a ninguna página en la que no esté autorizado como verificado.

    useEffect(() => {
        setUser(() => null);
        localStorage.removeItem("user");
    }, []);

    //! Gestionamos la navegación

    if(loginOk){
        if(res.data.user.check == false) {
            return <Navigate to="/verifyCode" />
        } else {
            return <Navigate to="/dashboard" />
        }
    }

    return (
        <>
            <div className="form-wrap">
            <h1>Iniciar sesión</h1>
            <p>🎊 ¡Encantados de tenerte de vuelta! 🎊</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="email_container form-group">
                <input
                    className="input_user"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="false"
                    {...register("email", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                    Correo electrónico
                </label>
    
                <div className="password_container form-group">
                    <input
                    className="input_user"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="false"
                    {...register("password", { required: true })}
                    />
                    <label htmlFor="custom-input" className="custom-placeholder">
                    Contraseña
                    </label>
                </div>
                </div>
    
                <div className="btn_container">
                <button
                    className="btn-custom btn-person"
                    type="submit"
                    disabled={send}
                >
                    {!send ? "Iniciar sesión" : "Iniciando..."}
                </button>
                
                </div>
                <p className="bottom-text">
                <small>
                    ¿Has olvidado tu contraseña?
                    <Link to="/forgotpassword" className="anchorCustom">
                    Cambiar contraseña
                    </Link>
                </small>
                </p>
            </form>
            </div>
            <div className="footerForm">
            <p className="parrafoLogin">
                ¿Todavía no estás registrado? <Link to="/register">Hazlo aquí</Link>
            </p>
            </div>
        </>
    )
}
