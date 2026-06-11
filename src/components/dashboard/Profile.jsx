import './Profile.css'
import { useState, useEffect } from "react";

export default function Profile({darkMode, setBirthday, birthday}){
    const [name, setName] = useState("");
    const [quote, setQuote] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("vaultName") || "");
        setBirthday(localStorage.getItem("vaultBirthday") || "");
        setQuote(localStorage.getItem("vaultQuote") || "");
    }, []);

    
    return(
        

        <div className="profile-card">
            <h1>
            {name
                ? `Welcome Back, ${name} ✨`
                : "Welcome Back ✨"}
            </h1>

            <input
                className="profile-input"
                type="text"
                placeholder="What should we call you?"
                value={name}
                onChange={(e) => {
                setName(e.target.value);
                localStorage.setItem(
                    "vaultName",
                    e.target.value
                );
                }}
            />

            <div className="field-group">
            <label>Birthdate</label>

            <input
                className="profile-input"
                type="date"
                value={birthday}
                onChange={(e) => {
                setBirthday(e.target.value);
                localStorage.setItem(
                    "vaultBirthday",
                    e.target.value
                );
                }}
            />
            </div>

            <div className="field-group">
            <label>Favorite Quote</label>

            <textarea
                className="profile-input quote-box"
                placeholder="Write something meaningful..."
                value={quote}
                onChange={(e) => {
                setQuote(e.target.value);
                localStorage.setItem(
                    "vaultQuote",
                    e.target.value
                );
                }}
            />
            </div>
        </div>
    )
}