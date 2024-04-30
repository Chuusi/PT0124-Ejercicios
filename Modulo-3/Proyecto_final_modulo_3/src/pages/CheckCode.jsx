import "./CheckCode.css"
import { useAuth } from "../context"
import { useEffect, useState } from "react";
import { checkCodeConfirmationUser, resendCodeConfirmationUser } from "../services/user.service";
import { useAutoLogin, useCheckCodeError, useResendCodeError } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



export const CheckCode = () => {
    
    //! ESTADOS

    const navigate = useNavigate();
    const {allUser, login, setUser} = useAuth();
    const {register, handleSubmit} = useForm();

    //* RES para el check del código de confirmación
    const [res, setRes] = useState({});

    //* Estado para la espera de envío de info
    const [send, setSend] = useState(false);
    const [okCheck, setOkCheck] = useState(false);

    //* Estado que gestiona el reenvío de código
    const [resResend, setResResend] = useState({});

    //* Estados por si se recarga la página
    const [okDeleteUser, setOkDeleteUser] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);


    //! Función para la data del formulario

    const formSubmit = async(formData) => {

        //! Variamos en función de si el usuario viene del login o el register:
        //! LOGIN: Información en el localStorage
        //! REGISTER: Información en allUser

        const userLocal = localStorage.getItem("user");

        if(userLocal == null) {
            //! Quiere decir que viene del register
            const customFormData = {
                confirmationCode: parseInt(formData.confirmationCode),
                email: allUser.data.user.email,
            }
            setSend(true);

            setRes(await checkCodeConfirmationUser(customFormData));
            console.log("Despues del send", res);

            setSend(false);
        } else {
            //! Si viene del login, cogemos la info del localStorage
            const parseUser = JSON.parse(userLocal);
            const customFormData = {
                confirmationCode: parseInt(formData.confirmationCode),
                email: parseUser.email,
            };

            setSend(true);
            setRes(await checkCodeConfirmationUser(customFormData));
            setSend(false);
        };

    };

    //! Función para la gestión del reenvío de código

    const handleReSend = async () => {
        const userLocal = localStorage.getItem("user");
        if(userLocal != null){
            const parseUser = JSON.parse(userLocal);
            const customFormData = {
                name: parseUser.name,
                email: parseUser.email,
            };

            setSend(true);
            setResResend(await resendCodeConfirmationUser(customFormData));
            setSend(false);
        } else {
            const customFormData = {
                name: allUser?.data?.user?.name,
                email: allUser?.data?.user?.email,
            }
            setSend(true);
            setResResend(await resendCodeConfirmationUser(customFormData));
            setSend(false);
        }
    };

    //! Y ahora el useEffect para la gestión de la respuesta

    useEffect(() => {
        console.log("Res 🎫", res);
        useCheckCodeError(
            res,
            setRes,
            setOkCheck,
            setOkDeleteUser,
            login,
            setUserNotFound            
        );
    },[res]);

    //! Y el useEffect para el reenvío del código

    useEffect(() => {
        console.log("Resend 🎟", resResend);
        useResendCodeError(
            resResend,
            setResResend,
            setUserNotFound,
        )
    },[resResend]);

    //! Por último, los condicionales que gestionan la navegación en función de los estados
    //! que se hayan ido cambiando en la gestión de las respuestas

    console.log("okCheck", okCheck);
    if(okCheck){

        //* Aquí hacemos el autologin cuando el user viene del register
        //* Cuando el user viene del login, lo gestionamos en useCheckCodeError
        if(!localStorage.getItem("user")){
            //* Viene del register
            useAutoLogin(allUser, login);
        } else {
            return <Navigate to="/dashboard"/>
        }
    };

    if(okDeleteUser) {
        return <Navigate to="/register" />
    }

    if(userNotFound) {
        return <Navigate to="/login"/>
    }
    
    return (
        <>
        <div className="form-wrap">
            <h1>Verifica tu código 👌</h1>
            <p>Introduce el código que te hemos enviado al correo</p>
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
                <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("confirmationCode", { required: false })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Código
                </label>
            </div>

            <div className="btn_container">
                <button
                id="btnCheck"
                className="btn-custom btn-person"
                type="submit"
                disabled={send}
                >
                Verificar código
                </button>
            </div>
            <div className="btn_container">
                <button
                id="btnResend"
                className="btn-custom btn-person"
                disabled={send}
                style={{ background: send ? "var(--primaryColor)" : "var(--btn-color)" }}
                onClick={() => handleReSend()}
                >
                Reenviar código
                </button>
            </div>

            <p className="bottom-text">
                <small>
                ❌ Si el código es incorrecto ❌, el usuario será borrado de la base
                de datos y tendrás que registrarte otra vez!{" "}
                </small>
            </p>
            </form>
        </div>
    </>
    )
}
