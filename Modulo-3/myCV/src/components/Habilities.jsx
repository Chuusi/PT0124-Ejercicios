import "./Habilities.css"

export const Habilities = ({habilities}) => {
    return (
        <div className="cards">
            <h2>Skills</h2>
            <div className="skillCard"><h3>Técnicas:</h3>
                {habilities.techniques.map((item) => {
                    return <p>{item}</p>
                })}
            </div>
            <div className="skillCard"><h3>Planificación:</h3>
                {habilities.planification.map((item) => {
                    return <p>{item}</p>
                })}
            </div>
            <div className="skillCard"><h3>Comunicación:</h3>
                {habilities.communication.map((item) => {
                    return <p>{item}</p>
                })}
            </div>
            <div className="skillCard"><h3>Otras:</h3>
                {habilities.others.map((item) => {
                    return <p>{item}</p>
                })}
            </div>
        </div>
    )
}
