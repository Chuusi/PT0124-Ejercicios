import Swal from "sweetalert2";

export const useLoginError = (res, setRes, userLogin, setLoginOk) => {
    
    //! RESPUESTA 200

    if(res?.status == 200){
        const dataCustom = {
            token: res.data.token,
            user: res.data.user.name,
            email: res.data.user.email,
            image: res.data.user.image,
            check: res.data.user.check,
            _id: res.data.user._id,
        };

        const stringUser = JSON.stringify(dataCustom);
        //* Esta es la función login del contexto
        userLogin(stringUser);
        setLoginOk(() => true);

        Swal.fire({
            icon: "success",
            title: "¡Adelante!",
            text: "✅ Inicio de sesión correcto ✅",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    //! RESPUESTA 404: Usuario no registrado

    if(res?.response?.data.includes("Usuario no registrado")) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Usuario no registrado ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    //! RESPUESTA 404: La contraseña no es correcta

    if(res?.response?.data.includes("Contraseña incorrecta")) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ La contraseña no es correcta ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    //! RESPUESTA 500: Error del servidor

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