import "./CharacterCard.css"

export const CharacterCard = ({id, name, image, status, origin}) => {
    
    return (
        <figure key={id}>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <h3 id="status">{status == 'Alive' ? "Vivo" : "¿Muerto?"}</h3>
            <h3 id="origen">Origen: {origin.name}</h3>
        </figure>
    )
}