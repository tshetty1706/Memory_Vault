import {React, useState} from 'react'
import './DashboardLayout.css'
import Sidebar from '../components/Sidebar';

function DashboardLayout({ setDarkMode, darkMode }) {
    return(
        <div>
            <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
        </div>
    )
}

export default DashboardLayout;