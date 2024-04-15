import "./Experience.css"

export const Experience = ({experience}) => {
    return (
        <div className="cards">
            <h2>Experiencia</h2>
            {experience.map((item, index) => {
                return(
                    <div className="eachExpCard" key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.date}</p>
                    <p>{item.where}</p>
                    <p>{item.description}</p>
                </div>
                )
                
            })}
        </div>
    )
}
