/* Aquí almacenamos los estados globales como el usuario conectado o la API de pokemon*/

const currentUser = {
    name: sessionStorage.getItem("currentUser")
        ? sessionStorage.getItem("currentUser")
        : "",
}

let userData = localStorage.getItem(currentUser.name)
    ? JSON.parse(localStorage.getItem(currentUser.name))
    : {
        name: "",
        token: false,
        fav: [],
};


/* get y sets específicos para está aplicación para traer información de API */

const dataGlobal = {
    pokemon: [],
};

export const setData = (data) => {
    dataGlobal.pokemon = data;
};

export const getData = () => {
    return dataGlobal.pokemon;
}

/* get y set para el usuario */

export const setUser = (username) => {
    currentUser.name = username;
};

export const getUser = () => {
    return currentUser;
};

export const setUserData = (data) => {
    console.log("...almacenando datos, espere.");
    userData.name = data?.name;
    userData.token = data?.token;
    userData.fav = data?.fav;

    const stringUser = JSON.stringify(userData);
    localStorage.removeItem(`${currentUser.name}`);
    console.log(`Bienvenido ${userData.name}`);
    localStorage.setItem(`${currentUser.name}`, stringUser);
};

export const getUserData = () => {
    return userData;
};