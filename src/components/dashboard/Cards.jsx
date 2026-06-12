import { useEffect, useState } from 'react'
import './Cards.css'

export default function Cards({ darkMode }){
    const [counts, setCounts] = useState({
        movies: 0,
        songs: 0,
        music: 0,
        hobbies: 0,
    });

    const refreshCounts = () => {
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        const songs = JSON.parse(localStorage.getItem('song')) || [];
        const hobbies = JSON.parse(localStorage.getItem('hobby')) || [];

        setCounts({
            movies: movies.length,
            songs: songs.length,
            music: songs.length, // reuse songs length for Music card if you don't have a separate key
            hobbies: hobbies.length,
        });
    }

    useEffect(() => {
        refreshCounts();
    }, []);

    const categories = [
        { icon: "🎬", title: "Movies", key: 'movies' },
        { icon: "🎵", title: "Songs", key: 'songs' },
        { icon: "🎼", title: "Music", key: 'music' },
        { icon: "🌿", title: "Hobbies", key: 'hobbies' },
    ];

    return(
        <div className="stats-grid">
            {categories.map((item) => (
            <div
                key={item.title}
                className="stats-card"
            >
                <span>{item.icon}</span>

                <h3>{item.title}</h3>

                <p>{counts[item.key] ?? 0}</p>
            </div>
            ))}
        </div>
    )
}