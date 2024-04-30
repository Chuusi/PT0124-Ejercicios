//! Función que retorna el token almacenado en el localStorage

export const updateToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
        const parseUser = JSON.parse(user);
        return parseUser.token;
    }
};
