import { useEffect, useState } from "react";
import "./Register.css"
import { registerUser } from "../services/user.service";
import { useRegisterError } from "../hooks";
import { useAuth } from "../context";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Uploadfile } from "../components";



export const Register = () => {
    
    const { allUser, setAllUser, bridgeData } = useAuth();
    const [ res, setRes ] = useState({});
    const [ send, setSend ] = useState(false);
    const [ okRegister, setOkRegister ] = useState(false);
    const { register, handleSubmit } = useForm();

    //? -----------------------------------------------------------
    //! 1.--- Función que se encarga de la data del formulario ----
    //? -----------------------------------------------------------

    const formSubmit = async(formData) => {


        //! traemos los archivos que potencialmente estén en el componente Uploadfile
        const inputFile = document.getElementById("file-upload").files;

        if(inputFile.length != 0) {
            const customFormData = {
                ...formData,
                image: inputFile[0],
            };

            //! El send nos permite controlar si la función asíncrona termina o no para, por ejemplo, deshabilitar botones, cambiar el color de algunas cosas, avisar al usuario...

            //! El registerUser lo llamamos del serviceApiUser, donde definiremos las funciones que tengamos en los archivos de back, definiendo si es post, delete... + la ruta y los datos.
            setSend(true);
            setRes(await registerUser(customFormData));
            setSend(false);
        } else {
            const customFormData = {
                ...formData,
            };

            setSend(true);
            setRes(await registerUser(customFormData));
            setSend(false);
        }
    };




    

    //? ----------------------------------------------------------------------------------------
    //! 2.--- useEffect: gestionamos todas las respuestas y errores -- useRegisterError.jsx ----
    //? ----------------------------------------------------------------------------------------
    
    useEffect(() => {
        console.log('Respuesta del error o no error', res);
        useRegisterError(res, setOkRegister, setRes);
        if(res?.status == 200) bridgeData("ALLUSER");
    },[res]);

    useEffect(() => {
        console.log("El allUser se almacenó bien", allUser);
    }, [allUser]);
    





    //? ----------------------------------------------------------------------------------------
    //! 3.------------------------------ Estados de navegación ---------------------------------
    //? ----------------------------------------------------------------------------------------

    if(okRegister){
        return <Navigate to="/verifyCode"/>
    }

    //! Return con la interfaz:
    //! onSubmit gestiona lo que hace el formulario al hacer click en el button submit, en nuestro caso
    //! utiliza handleSubmit del hook useForm llamando a formSubmit definido anteriormente.
    //! Cada input llevará asociado un name que se corresponde con el tipo de dato que queremos rellenar en el backend.


    return (
        <>
        <div className="form-wrap">
            <h1>Regístrate</h1>
            <p>Es gratis y no te llevará nada de tiempo</p>
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
                <input
                    className="input_user"
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="false"
                    {...register("name", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Nombre de usuario
                </label>
            </div>
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

                <div className="sexo">
                <input
                    type="radio"
                    name="gender"
                    id="hombre"
                    value="masculino"
                    {...register("gender")}
                />
                <label htmlFor="hombre" className="label-radio hombre">
                    Hombre
                </label>
                <input
                    type="radio"
                    name="gender"
                    id="mujer"
                    value="femenino"
                    {...register("gender")}
                />
                <label htmlFor="mujer" className="label-radio mujer">
                    Mujer
                </label>
                <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="otro"
                    {...register("gender")}
                />
                <label htmlFor="other" className="label-radio other">
                    Otro
                </label>
                </div>
                <Uploadfile />
            </div>

            <div className="btn_container">
                <button
                className="btn-person btn-custom"
                type="submit"
                disabled={send}
                >
                { send ? "Cargando..." : "Registrarse" }
                </button>
            </div>
            <p className="bottom-text">
                <small>
                Haciendo click en "Registrarse", aceptas nuestros{" "}
                <Link className="anchorCustom">Términos & condiciones</Link> y{" "}
                <Link className="anchorCustom">Políticas de privacidad</Link>
                </small>
            </p>
            </form>
        </div>
        <div className="footerForm">
            <p className="parrafoLogin">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
        </>
    )
}
