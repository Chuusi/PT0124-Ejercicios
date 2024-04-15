import "./SobreMi.css"

export const SobreMi = ({me}) => {
    return (
        <div className="cards">
            <h2>Sobre mí:</h2>
            <ul>
                {me.aboutMe.map((item, index) => {
                return <li key={index}>{item.info}</li>})}
            </ul>
            
        </div>
    )
}
