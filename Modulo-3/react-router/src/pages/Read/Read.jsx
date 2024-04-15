import "./Read.css"
import { hobbies } from "../../components/Hobbies/Hobbies"

export const Read = () => {
    return (
        <div>
            <h2>Libros</h2>
            <div id="Bgallery">
            {hobbies.read.map((book) => 
                <figure key={book.title}>
                    <img src={book.bookImage} alt={book.title} />
                    <h2>{book.title}</h2>
                    <h3>{book.authorName}</h3>
                    <h4>{book.dateOfPublication}</h4>
                    <h4>Género: {book.genre}</h4>
                </figure>
            )}
        </div>
        </div>
    )
}
