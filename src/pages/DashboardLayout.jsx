import {React, useState} from 'react'
import './DashboardLayout.css'
import Sidebar from '../components/sidebar/Sidebar';
import Dashboard from '../components/dashboard/Dashboard';
import {Outlet} from 'react-router-dom'

function DashboardLayout({ setDarkMode, darkMode }) {
    return(
        <div style={{ display: 'flex', height: '100vh', overflowY: 'auto' }}>
            <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />

                <main style={{ flex: 1 }}>
                    <Outlet />
                </main>
        </div>
    )
}

export default DashboardLayout;