import Swal from "sweetalert2";


export const useChangePasswordError = (res, setRes, setUser, setChanged) => {
    
    //! TODO OK

    console.log(res? res : "no res");
    if(res?.data?.updateUser?.toString() == "true") {
        setUser(() => null);
        localStorage.removeItem("user");
        setChanged(() => true);
        setRes(() => ({}));
        return Swal.fire({
            icon: "success",
            title: "✅ Contraseña cambiada ✅",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    //! UPDATE USER FALSE

    if(res?.data?.updateUser?.toString() == "false"){
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "❎ Error interno del servidor ❎",
            text: "Inténtalo de nuevo",
            showConfirmButton: false,
            timer: 2500,
        })
    }

    //! 404 LAS CONTRASEÑAS NO COINCIDEN

    if(res?.response?.data?.includes("Contraseña antigua incorrecta")){
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "La antigua contraseña no es correcta,  ❎ Inténtalo de nuevo",
            showConfirmButton: false,
            timer: 3000,
        })
    }

    //! 404 GENERAL

    if(res?.response?.status == 404) {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "❎ Ha habido un error ❎",
            text: "Inténtalo de nuevo",
            showConfirmButton: false,
            timer: 3000,
        })
    }

    //! 500 ERROR SERVIDOR

    if(res?.response?.status == 500) {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Error interno del servidor ❎",
            showConfirmButton: false,
            timer: 1500,
        })
    }
}