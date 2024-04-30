import Swal from "sweetalert2";

export const useResendCodeError = (
    resResend,
    setResResend,
    setUserNotFound
) => {

    //! 404 resend está en false
    if(resResend?.data?.resend.toString() == "false"){
        setResResend(() => ({}));
        Swal.fire({
            icon: "error",
            title: "No se pudo reenviar el código 🔴. Inténtalo de nuevo!",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    //! 200 resend está en true
    if(resResend?.data?.resend.toString() == "true") {
        setResResend(() => ({}));
        Swal.fire({
            icon: "success",
            title: "Se ha enviado un código ✅. Verifica tu bandeja de entrada.",
            showConfirmButton: false,
            timer: 3000,
        });
    };

    //! 404 user not found
    if(
        resResend?.response?.status == 404 &&
        resResend?.response?.data.includes("No existe un usuario")
    ) {
        setUserNotFound(() => true);
        setResResend(() => ({}));
        Swal.fire({
            icon: "error",
            title: "❎ Error interno del servidor ❎",
            text: "Usuario no encontrado, intenta iniciar sesión.",
            showConfirmButton: false,
            timer: 1500,
        })
    };

    //! 500 error interno del servidor
    if(resResend?.response?.status == 500) {
        setResResend(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Error interno del servidor ❎ Intenta de nuevo",
            showConfirmButton: false,
            timer: 1500,
        })
    }

}