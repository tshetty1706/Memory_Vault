import "./Dashboard.css";
import Profile from './Profile';
import Cards from "./Cards";
import BirthdayCount from "./BirthdayCount";
import {useState} from 'react'

export default function Dashboard({ darkMode }) {
  const [birthday, setBirthday] = useState("");
  return (
    <div
      className={`dashboard ${
        darkMode ? "dashboard-dark" : "dashboard-light"
      }`}
    >
      <Profile darkMode={darkMode} setBirthday = {setBirthday} birthday = {birthday} style={{marginBottom:"0 rem"}} />
      
      <Cards darkMode={darkMode} style={{marginBottom:"0 rem"}} />

      <BirthdayCount darkMode={darkMode} setBirthday = {setBirthday} birthday = {birthday} style={{marginBottom:"0 rem"}} />
      
    </div>
  );
}