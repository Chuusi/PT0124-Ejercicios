import { useForm } from "react-hook-form";
import "./FormProfile.css"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateUser } from "../services/user.service";
import { useUpdateError } from "../hooks";
import { useAuth } from "../context";
import { FigureUser, Uploadfile } from "../components";
import { Navigate } from "react-router-dom";



export const FormProfile = () => {
    const {user, setUser, allUser, bridgeData} = useAuth();
    const {register, handleSubmit} = useForm();

    const [res,setRes] = useState({});
    const [send, setSend] = useState(false);
    

    const {login} = useAuth();


    const defaultData = {
        name: user?.user,
    }

    const formSubmit = (formData) => {
        Swal.fire({
            title: "¿Seguro que quieres cambiar los datos de tu perfil?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(73, 193, 162)",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI",
            cancelButtonText: "NO",
        }).then(async (result) => {
            if(result.isConfirmed) {
                const inputFile = document.getElementById("file-upload").files;
                console.log(inputFile);
                if(inputFile.length != 0) {
                    const customFormData = {
                        ...formData,
                        image: inputFile[0],
                    }


                    setSend(true);
                    setRes(await updateUser(customFormData));
                    setSend(false);
                } else {
                    const customFormData = {
                        ...formData,
                    };


                    setSend(true);
                    setRes(await updateUser(customFormData));
                    setSend(false);
                } 
            }
        })
    };

    useEffect(() => {
        console.log(res);
        useUpdateError(res, setRes, login);
    }, [res]);


    return (
        <>
        <div className="containerProfile">
            <div className="containerDataNoChange">
            <FigureUser user={user} />
            </div>
            <div className="form-wrap formProfile">
            <h1>♻ Cambiar datos del perfil ♻</h1>
            <p>Introduce los nuevos datos</p>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="user_container form-group">
                <input
                    className="input_user"
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="false"
                    // LO NUEVOOOOOOOO------>
                    defaultValue={defaultData?.name}
                    {...register("name")}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                    Nombre de usuario
                </label>
                </div>
                <Uploadfile />
                <div className="btn_container">
                <button
                    className="btn-custom btn-person"
                    type="submit"
                    disabled={send}
                >
                    CAMBIAR DATOS DE LA CUENTA
                </button>
                </div>
            </form>
            </div>
        </div>
        </>
    )

};

