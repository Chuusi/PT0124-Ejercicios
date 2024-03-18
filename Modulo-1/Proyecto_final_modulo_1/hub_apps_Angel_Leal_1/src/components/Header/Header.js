import { getUser, getUserData } from "../../global/state/globalState";
import { initControler, changeColorRGB } from "../../utils";
import "./Header.css";

const template = () => `
<div id="header" class="center">
        <div id="logo" class="center">
            <img src="https://pngfre.com/wp-content/uploads/Pokeball-1.png" alt="pokeball">
            <p>HUB APP</p>
        </div>
        <nav id="navBar">
            <h3 id="welcome">Bienvenido/a</h3>
            <ul class="center">
                <li><button class="center" id="colores"><p class="material-symbols-outlined">
                palette
                </p>Colores</button></li>
                <li><button class="center" id="dash"><p class="material-symbols-outlined">
                menu_open
                </p>Dashboard</button></li>
                <li><button class="center" id="logout"><p class="material-symbols-outlined">
                logout
                </p>LogOut</button></li>
            </ul>
        </nav>
</div>
`;

const addListeners = () => {
    /* Control del botón LOGOUT */
    const buttonLogout = document.getElementById("logout");
    buttonLogout.addEventListener("click", (e) => {
        const userState = getUser().name;
        const currentUser = localStorage.getItem(userState);
        const parseCurrentUser = JSON.parse(currentUser);
        const updateUser = {...parseCurrentUser, token: false};
        const stringUpdateUser = JSON.stringify(updateUser);
        localStorage.removeItem(userState);
        sessionStorage.removeItem("currentUser");
        localStorage.setItem(userState, stringUpdateUser);

        initControler("Login");
    });

    /* Control del botón DASHBOARD */
    const buttonDash = document.getElementById("dash");
    buttonDash.addEventListener("click", (e) => {
        initControler("Dashboard");
    });

    /* Control del botón COLORES, que modificará directamente los colores en el :root */
    const buttonColores = document.getElementById("colores");
    buttonColores.addEventListener("click", (e) => {
        const color1 = changeColorRGB();
        const color2 = changeColorRGB();
        const color3 = changeColorRGB();

        document.body.style.backgroundColor = color1+"0.3)";
        document.documentElement.style.setProperty(`--primaryC`, color1+"1)");
        document.documentElement.style.setProperty(`--secondC`, color2+"1)");
        document.documentElement.style.setProperty(`--thirdC`, color3+"1)");

    });
    /* En caso de querer volver a los colores iniciales, sólo tendremos que hacer doble click en COLORES */
    buttonColores.addEventListener("dblclick", (e) => {
        document.body.style.backgroundColor = "white";
        document.documentElement.style.setProperty(`--primaryC`,  "#14110F");
        document.documentElement.style.setProperty(`--secondC`, "#F2F3AE");
        document.documentElement.style.setProperty(`--thirdC`, "#d72638");
    })
};

export const PrintTemplateHeader = () => {
    document.querySelector("header").innerHTML = template();
    addListeners();
};
