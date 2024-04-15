import "./Languages.css"

export const Languages = ({languages}) => {
    return (
        <div className="cards">
            <h2>Idiomas</h2>
            <div className="idiomasCards">
                {languages.map((item) => {
                    return(
                        <div key={item.language} className="idiomasCard">
                            <h4>{item.language}</h4>
                            <p>Escrito: {item.wrlevel}</p>
                            <p>Hablado: {item.splevel}</p>
                        </div>
                    )
                        
                })}
            </div>
        </div>
    )
}
