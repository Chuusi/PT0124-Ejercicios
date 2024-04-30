import Swal from "sweetalert2";
import { updateToken } from "../utils";


export const useUpdateError = (res, setRes, login) => {

    //! RES 200

    let contador;
    let totalItems;
    let check = "";

    if(res?.data) {
        contador = 0;
        totalItems = 0;

        res?.data?.testUpdate?.map((item) => {
            for(let clave in item) {
                totalItems++;
                if(item[clave] == false) {
                    contador++;
                }
            }
        });
    }

    if(contador != totalItems) {

        res?.data?.testUpdate?.forEach((item) => {
            for (let clave in item) {
                if(item[clave] == true){
                    check += `-${clave}-`;
                }
            }
        })
    };


    if(res?.status == 200 && contador == totalItems){
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Datos iguales a los anteriores ❎",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    if(res?.status == 200) {

        setRes(() => ({}));
        const currentToken = updateToken();
        const customData = {
            email: res?.data?.testUpdateUser?.email,
            check: res?.data?.testUpdateUser?.check,
            image: res?.data?.testUpdateUser?.image,
            user: res?.data?.testUpdateUser?.name,
            _id: res?.data?.testUpdateUser?._id,
            token: currentToken,
        }
        
        const stringUser = JSON.stringify(customData);
        login(stringUser);
        

        return Swal.fire({
            icon: "success",
            title: `✅ Datos actualizados ✅`,
            text: ` Actualizado: ${check} `,
            showConfirmButton: false,
            timer: 1500,
        })
    }

    //! RES 500 || 404

    if(res?.response?.status == 500 ||res?.response?.status == 404) {
        setRes(() => ({}));
        return Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "❎ Error interno del servidor ❎",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    if (contador != 0) {
        if(res?.status == 200) {
            setRes(() => ({}));
            return Swal.fire({
                icon: "error",
                title: `❌ Algo ha fallado, inténtalo de nuevo ❌`,
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
}