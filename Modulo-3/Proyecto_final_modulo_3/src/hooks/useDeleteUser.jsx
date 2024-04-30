import Swal from "sweetalert2"
import { deleteUserService } from "../services/user.service";


export const useDeleteUser = (setUser, setDeleteUser) => {
    Swal.fire({
        title: "¿Seguro que quieres borrar tu cuenta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        cancelButtonText: "NO",
        confirmButtonText: "SI",
    }).then(async (result) => {
        console.log("result", result);
        if(result.isConfirmed) {
            const res = await deleteUserService();
            switch (res.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: "Cuenta borrada",
                        text: "¡Hasta la próxima!",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setUser(() => null);
                    setDeleteUser(() => true);
                    localStorage.removeItem("user");

                    break;
                
                default:
                    Swal.fire({
                        icon: "error",
                        title: "❎ No se ha podido borrar tu cuenta ❎",
                        text: "Inténtalo de nuevo, por favor",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    break;
            };
        };
    });
};