import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header, Main } from './components'

function App() {

  return (
      <div className='App'>
        <Header/>
        <Main/>
        <Footer/>
      </div>
  )
}

export default App
