import { useState } from 'react'
import './App.css'

function App() {

  const saludo = (hora) => {
      if(hora >= 6 && hora <= 12){
        return `Buenos días! Son las ${hora} de la mañana.`
      }
      else if(hora >= 13 && hora <= 19){
        return `Buenas tardes! Son las ${hora} de la tarde.`
      }
      else if(20 <= hora <= 24 && 1 <= hora <= 5){
        return `Buenas noches! Son las ${hora} de la noche.`
      }
  }

  const listado = ["Sebastián", "Liviu", "Sandra", "Bea", "Elena"];

  const juegos = [
    {
      titulo: "Hollow Knight",
      fecha: 2017
    },
    {
      titulo: "Celeste",
      fecha: 2018
    },
    {
      titulo: "Noita",
      fecha: 2020
    },
    {
      titulo: "Blasphemous",
      fecha: 2019
    }
  ]

  const [pintado, setPintado] = useState(false)

  return (
    <>
      <h1>{saludo(18)}</h1>

      <hr />

      <div>{listado.map((item, index) => <h2 key={index}>Hola {item}!</h2>)}</div>

      <hr />

      <div>{juegos.map((juego, index) => <h2 key={index}>El {juego.titulo} salió en {juego.fecha}</h2>)}</div>

      <hr />

      <button onClick={() => setPintado(!pintado)}>Botón mágico</button>
      <h2>{pintado ? "APAREZCO Y DESAPAREZCO" : ""}</h2>
    </>
  )
}

export default App
