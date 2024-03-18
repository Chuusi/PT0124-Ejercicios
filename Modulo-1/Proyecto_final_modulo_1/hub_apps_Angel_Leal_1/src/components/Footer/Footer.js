import { getData } from "../../global/state/globalState";
import "./Footer.css"

const template = () => `
<div id="footer">
    <span class="huevo"></span>
    <h3> Ningún pokemon ha sido dañado en la creación de esta página. </h3>
    <div class="huevo"><span></span></div>
    </div>
`;

export const PrintTemplateFooter = () => {
    document.querySelector("footer").innerHTML = template();
};