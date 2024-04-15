import "./Education.css"

export const Education = ({education}) => {
    return (
        <div className="cards">
            <h2>Estudios</h2>
            {education.map((item, index) => {
                return (
                    <div className="eachEducationCard" key={index}>
                        <p className="name">{item.name}</p>
                        <p>{item.where}</p>
                        <p>{item.date}</p>
                    </div>
                )
            })}
        </div>
    )
}
