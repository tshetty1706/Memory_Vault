import {React, useState, useEffect} from 'react'
import "./Sidebar.css";
import {
  FaHome,
  FaFilm,
  FaMusic,
  FaStar,
  FaTv
} from "react-icons/fa";
import { NavLink } from 'react-router-dom'

import { GiSpellBook } from "react-icons/gi";

function Sidebar({ setDarkMode, darkMode }) {

  const [activeItem, setActiveItem] = useState('Dashboard'); // navbar clicked item 

  useEffect(()=>setActiveItem(window.location.pathname === "/" ? "Dashboard" : window.location.pathname.slice(1).charAt(0).toUpperCase() + window.location.pathname.slice(2)),[window.location.pathname]);
  // This effect runs whenever the URL path changes, updating the active item based on the current route. It checks if the path is "/" to set "Dashboard" as active, otherwise it capitalizes the first letter of the path and sets it as active.

  function renderNavItem(label, Icon, path) {
    const isActive = activeItem === label;
    return (
      <NavLink style={{textDecoration:"none"}}
        key={label}
        to={path}
        className={`nav-item${isActive ? ' active' : ''}`}
        onClick={() =>setActiveItem(label)}
        aria-pressed={isActive}
      >
        <Icon />
        {label}
      </NavLink>
    );
  }

  return (
    <aside
      className={`sidebar ${darkMode ? 'dark-theme' : 'light-theme'}`}
    >
      <div className="sidebar-logo">

        <NavLink style={{textDecoration:"none"}} to={"/"}>
          <h1>
            Memory
            <span>Vault</span>
          </h1>

          <p>Your Personal Cosmos</p>

        </NavLink>
      </div>

      <nav className="sidebar-menu">
        {renderNavItem('Dashboard', FaHome, "/dashboard")}
        {renderNavItem('Movies', FaFilm, "/movies")}
        {renderNavItem('Songs', FaMusic, "/songs")}
        {/* {renderNavItem('Actors', FaStar, "/actors")}
        {renderNavItem('Cartoons', FaTv, "/cartoons")} */}
        {renderNavItem('Hobbies', GiSpellBook, "/hobbies")}
      </nav>

      <div className="theme-section">

        <span>
          {darkMode ? '🌙 Dark Mode' : '☀ Light Mode'}
        </span>

        <label className="switch">
          <input
            type="checkbox"
            checked={!!darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />

          <span className="slider"></span>

        </label>

      </div>

    </aside>
  );
}

export default Sidebar;