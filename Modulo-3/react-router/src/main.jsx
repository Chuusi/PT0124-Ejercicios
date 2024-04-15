import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import {Home} from "./pages/Home.jsx"
import {Read} from "./pages/Read/Read.jsx"
import {Songs} from "./pages/Songs/Songs.jsx"
import {Videogames} from "./pages/Videogames/Videogames.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Home/>}/>
          <Route path="read" element={<Read/>}/>
          <Route path="songs" element={<Songs/>}/>
          <Route path="videogames" element={<Videogames/>}/>
          <Route path="*" element={
            <main>
              <p>404 - La ruta no existe!</p>
            </main>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
