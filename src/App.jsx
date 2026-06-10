import { useState } from 'react'
import Intro from './pages/Intro'
import Dashboard from './pages/Dashboard'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/dashboard" element={<Dashboard />}>

              {/* 
              
              <Route path="movies" element={<Movies />} />
              <Route path="songs" element={<Songs />} />
              <Route path="actors" element={<Actors />} />
              <Route path="cartoons" element={<Cartoons />} />
              <Route path="hobbies" element={<Hobbies />} />

              <Route path="favorites" element={<Favorites />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
