import { useState , useEffect} from 'react'
import Intro from './pages/Intro'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './components/dashboard/Dashboard'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import './App.css'


function App() {

  let [darkMode, setDarkMode] = useState(localStorage.getItem("mode") === "true" || false);

  useEffect(()=>localStorage.setItem("mode",darkMode),[darkMode]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
            <Route element={<DashboardLayout setDarkMode={setDarkMode} darkMode={darkMode} />}>

            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            {/* <Route path="/movies" element={<Movies />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/cartoons" element={<Cartoons />} />
            <Route path="/hobbies" element={<Hobbies />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
