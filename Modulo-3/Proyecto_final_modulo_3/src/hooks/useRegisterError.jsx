import Swal from "sweetalert2";

export const useRegisterError = (res, setRegisterOk, setRes) => {
    //? Si la respuesta es ok, se encuentra en res.status
    //? Si la respuesta no es ok, se encuentra en res.response.status

    console.log(res);

    //! 200 -> RESPUESTA PARA TODO OK
    if(res?.status == 200){
        console.log("Como diría Dumbledore, todo ha salido bien");
        const dataToString = JSON.stringify(res);
        localStorage.setItem("data", dataToString);
        setRegisterOk(() => true);

        Swal.fire({
            icon: "success",
            title: "🎉 ¡El registro salió bien! 🎉",
            showConfirmButton: false,
            timer: 1500,
        });

        setRes(() => {});
    };

    //! 409 -> USER YA REGISTRADO
    if(res?.response?.status == 409){
        Swal.fire({
        icon: "error",
        title: "El usuario ya existe",
        text: "Ya hay un registro con este email",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    };

    //! CONTRASEÑA CON MAL FORMATO
    if(res?.response?.data?.message?.includes("validation failed: password")) {
        Swal.fire({
        icon: "error",
        title: "Contraseña insuficiente",
        text: "❎ Min 8 caracteres, 1 mayúsucla, 1 minúscula y un carácter especial ❎",
        showConfirmButton: false,
        timer: 3000,
        });
        setRes({});
    };


    //! 500 -> INTERNAL SERVER ERROR
    if(res?.response?.status == 500) {
        Swal.fire({
        icon: "error",
        title: "Perdón...",
        text: "❎ Error interno del servidor ❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    };

    //! 404 -> REENVÍO DE CÓDIGO NECESARIO
    if(
        res?.response?.status == 404 &&
        res?.response?.data?.confirmationCode?.includes("reenvío de código necesario")
    ) {
        Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "❎ Fallo en el envío de código ❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }

    //! 404 -> FALTA ELEGIR SEXO

    if(
        res?.response?.status == 404 &&
        res?.response?.data?.message?.includes("failed: gender: Path `gender` is required.")
    ) {
        Swal.fire({
        icon: "error",
        title: "Ups...",
        text: '❎ Elige un sexo o señala "otro" si no quieres ❎',
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }
}
