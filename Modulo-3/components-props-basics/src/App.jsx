import './App.css'
import { Title, Subtitle, Image, Paragraph } from './components'

function App() {

  return (
      <div>
        <Title texto="Bienvenido al uso de props"/>
        <Subtitle texto="Vamos a ver si somos capaces de usarlo" />
        <Image 
          src="https://media.istockphoto.com/id/1355408523/es/vector/character_32-de-dibujos-animados-para-ni%C3%B1os.jpg?s=612x612&w=0&k=20&c=u82pRZwZiDXEQvUXBYDRKgnqkm3Egk2a-eZAJMfVQeg="
          alt="Niño pensando"
          width="400"
          height="400"
        />
        <Paragraph texto="El uso de props a veces puede ser confuso, sobretodo cuando da errores por todos lados, no funciona, pero cuando reinicias funciona por arte de magia 🙄"/>
      </div>
  )
}

export default App