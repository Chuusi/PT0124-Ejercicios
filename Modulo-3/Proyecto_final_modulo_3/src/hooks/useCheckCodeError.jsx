import Swal from "sweetalert2/dist/sweetalert2.all"


export const useCheckCodeError = (
    res,
    setRes,
    setOkCheck,
    setOkDeleteUser,
    userLogin,
    setUserNotFound,
) => {

    //? RESPUESTA 500
    
    if(res?.response?.status == 500){
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Error interno del servidor ❎",
            showConfirmButton: false,
            timer: 1500,
        })
    };
    console.log("TESTCHECKOK", res?.data?.testCheckOk);
    console.log(res? res : "");

    //? RESPUESTA 200
    //? Comprobamos si hay un user en el localStorage para modificarlo en caso afirmativo
    //? Y hacer el login directamente con el user ya en check: true.
    if(res?.data?.testCheckOk?.toString() == "true") {
        console.log("Entro en el 200");

        if(localStorage.getItem("user")){
            const currentUser = localStorage.getItem("user");
            const parseUser = JSON.parse(currentUser);
            const customUser = {
                ...parseUser,
                check: true,
            };
            
            const stringUser = JSON.stringify(customUser);
            userLogin(stringUser);
        };
        
        setOkCheck (() => true);
        setRes(() => ({}))
        Swal.fire({
            icon: "success",
            title: "✅ Código correcto ✅",
            showConfirmButton: false,
            timer: 1500,
        });

    };

    //? RESPUESTA 200 Pero el test = false, el código es correcto pero en el back no pudo realizarse la tarea
    if(res?.data?.testCheckOk?.toString() == false) {
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "❎ Error interno del servidor ❎",
            text: "Inténtalo de nuevo, por favor.",
            showConfirmButton: false,
            timer: 2500,
        })
    };

    //? RESPUESTA 200 se deletea el user porque el código es erróneo
    if(res?.data?.delete?.includes("User borrado correctamente")) {
        //! Lo usaremos para enviarlo de nuevo al register, ya que lo borraremos
        setOkDeleteUser(() => true);
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "❎ Código incorrecto ❎",
            text: "El usuario ha sido borrado, regístrate de nuevo.",
            showConfirmButton: false,
            timer: 2500,
        });
    };

    //? RESPUESTA 200 ha habido un error en el borrar user
    if(res?.data?.delete?.includes("No se borró el user")){
        setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "❎ Código incorrecto ❎",
            text: "Inténtalo de nuevo, por favor.",
            showConfirmButton: false,
            timer: 2500,
        })
    }

    //? RESPUESTA 404: user not found
    if(res?.response?.status == 404){
        setUserNotFound(() => true);
        setRes(() => true);
        Swal.fire({
            icon: "error",
            title: "❎ Error interno del servidor ❎",
            text: "Inicia sesión para verificar el código.",
            showConfirmButton: false,
            timer: 1500,
        })
    }
}