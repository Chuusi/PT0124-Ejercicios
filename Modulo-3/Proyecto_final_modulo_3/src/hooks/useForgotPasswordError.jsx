import Swal from "sweetalert2";


export const useForgotPasswordError = (res, setRes, setForgotOk) => {
    
    if(
        res?.response?.status == 404 &&
        res?.response?.data?.includes("Usuario no registrado")
    ) {
        setRes({});
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ No hay ninguna cuenta con este corero. ❎",
            showConfirmButton: false,
            timer: 3000,
        });
    };

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.includes("No se pudo mandar el email para el cambio de código de acceso")
    ) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ No se pudo mandar el correo con la neuva contraseña. ❎",
            showConfirmButton: false,
            timer: 3000,
        });
    }

    if(res?.status == 200){
        if(res?.data?.sendPassword == true && res?.data?.updateUser == true) {
            setForgotOk(() => true);
            setRes(() => ({}));
            Swal.fire({
                icon: "success",
                title: "Contraseña cambiada",
                text: "✅ Se ha enviado un mail con tu nueva contraseña ✅",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.sendPassword == true &&
        res?.response?.data?.updateUser == false
    ) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Error en el cambio de contraseña",
            text: "❎ La contraseña que te hemos enviado no es válida ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    if(res?.response?.status == 500) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Error interno del servidor ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}