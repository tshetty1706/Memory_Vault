import {React, useState} from 'react'
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

        <h1>
          Memory
          <span>Vault</span>
        </h1>

        <p>Your Personal Cosmos</p>

      </div>

      <nav className="sidebar-menu">
        {renderNavItem('Dashboard', FaHome, "/dashboard")}
        {renderNavItem('Movies', FaFilm, "/movies")}
        {renderNavItem('Songs', FaMusic, "/songs")}
        {renderNavItem('Actors', FaStar, "/actors")}
        {renderNavItem('Cartoons', FaTv, "/cartoons")}
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