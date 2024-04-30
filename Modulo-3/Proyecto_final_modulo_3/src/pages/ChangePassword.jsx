import { useForm } from "react-hook-form";
import { useAuth } from "../context"
import "./ChangePassword.css"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { changePasswordUserToken } from "../services/user.service";
import { useChangePasswordError } from "../hooks";
import { Navigate } from "react-router-dom";


export const ChangePassword = () => {
    
    const {setUser} = useAuth();
    const {handleSubmit, register} = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [changed, setChanged] = useState(false);

    //! Función para gestión del formulario

    const formSubmit = (formData) => {
        const {password, newPassword, confirmPassword} = formData;

        if (newPassword == confirmPassword) {
            Swal.fire({
                title: "¿Seguro que quieres cambiar tu contraseña?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "rgb(73, 193, 162)",
                cancelButtonColor: "#d33",
                confirmButtonText: "SI",
                cancelButtonText: "NO",
            }).then(async (result) => {
                if(result.isConfirmed) {
                    setSend(true);
                    setRes(await changePasswordUserToken({password, newPassword}));
                    setSend(false);
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "❎ Las contraseñas no coinciden. ❎",
                showConfirmButton: false,
                timer: 2500,
            })
        }
    }
    
    //! useEffect para gestión de respuesta

    useEffect(() => {
        useChangePasswordError(res,setRes,setUser, setChanged);
    },[res]);

    if(changed) {
        return <Navigate to="/profile" />
    }

    return (
        <>
        <div className="form-wrap">
            <h1>♻ Cambiar contraseña ♻</h1>
            <p>Introduce tu antigua y tu nueva contraseña</p>
            <form onSubmit={handleSubmit(formSubmit)}>
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
                Antigua contraseña
                </label>
            </div>
            <div className="newPassword_container form-group">
                <input
                className="input_user"
                type="password"
                id="newPassword"
                name="newPassword"
                autoComplete="false"
                {...register("newPassword", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Nueva contraseña
                </label>
            </div>
            <div className="confirmPassword_container form-group">
            <input
                className="input_user"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="false"
                {...register("confirmPassword", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                Confirma tu nueva contraseña
                </label>
            </div>
            <div className="btn_container">
                <button
                className="btn-custom btn-person"
                type="submit"
                disabled={send}
                >
                CAMBIAR CONTRASEÑA
                </button>
            </div>
            </form>
        </div>
        </>
    )
}
