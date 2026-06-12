import { useState , useEffect} from 'react'
import Intro from './pages/Intro'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './components/dashboard/Dashboard'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import './App.css'
import Movies from './components/movies/Movies'
import Hobby from './components/hobby/Hobby'
import Song from './components/song/Song'


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
            <Route path="/movies" element={<Movies darkMode={darkMode} />} />
            <Route path="/songs" element={<Song darkMode={darkMode} />} />
            {/* <Route path="/actors" element={<Actor darkMode={darkMode} />} />
            <Route path="/cartoons" element={<Cartoon darkMode={darkMode} />} /> */}
            <Route path="/hobbies" element={<Hobby darkMode={darkMode} />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
