import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header } from './components'

function App() {

  return (
    <>
      <Header/>
      <main>
        <div class="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
