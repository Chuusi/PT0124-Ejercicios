import { Paragraph } from "../Paragraph/Paragraph"
import "./Footer.css"

export const Footer = () => {
    const footerText = "Mini proyecto realizado por Ángel 'Suchi' Leal con ReactJS componetizando prácticamente todo para la posible reutilización de elementos."
    const copyright = "Copyright (c) 2024 Ángel Leal All Rights Reserved"
    
    return (
        <footer>
            <Paragraph texto={footerText} />
            <Paragraph texto={copyright} />
        </footer>
    )
}