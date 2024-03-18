import "./Login.css";
import { setUser, setUserData } from "../../global/state/globalState";
import { initControler } from "../../utils";

const template = () => `
<div id="main">
<div id="login">
    <h2>Nombre de usuario:</h2>
    <input type="text" name="username" id="username" />
    <button id="buttonLogin">Entrar</button>
</div>
</div>`;

/* En caso de ya existir un user, se inicia con los valores de ese user, en caso de que no,
se inicia con datos vacíos y como nombre el user que haya puesto en el input */

const addListener = () => {
    const buttonLogin = document.getElementById("buttonLogin");
    const username = document.getElementById("username");
    buttonLogin.addEventListener("click", (e) => {
        const valueInput = username.value;

        if(localStorage.getItem(`${valueInput}`)){
            const localUser = localStorage.getItem(`${valueInput}`);
            const parseUser = JSON.parse(localUser);
            
            parseUser.token = true;

            const stringUser = JSON.stringify(parseUser);
            localStorage.setItem(`${valueInput}`, stringUser);
            sessionStorage.setItem("currentUser", `${valueInput}`);

            setUser(`${valueInput}`);
            setUserData(parseUser);
            console.log(localStorage.getItem(`${valueInput}`)+"IF LOGIN");
            console.log(localStorage.getItem(`${valueInput}.name`));

        } else {
            const customUser = {
                name : username.value,
                token: true,
                fav: [],
            };

            const stringUser = JSON.stringify(customUser);
            localStorage.setItem(`${valueInput}`, stringUser);
            sessionStorage.setItem("currentUser", `${valueInput}`);


            setUser(`${valueInput}`);
            setUserData(customUser);
            console.log(localStorage.getItem(`${valueInput}`)+ "ELSE LOGIN");
        }
        initControler();
    });
};

export const Login = () => {
    document.querySelector("#navBar").style.display = "none";
    document.querySelector("#logo").style.paddingLeft = "0";
    document.querySelector("main").innerHTML = template();
    addListener();
};