import './Cards.css'

export default function Cards({darkMode}){
    const categories = [
        { icon: "🎬", title: "Movies", count: 0 },
        { icon: "🎵", title: "Songs", count: 0 },
        { icon: "🎼", title: "Music", count: 0 },
        { icon: "🎭", title: "Actors", count: 0 },
        { icon: "📺", title: "Cartoons", count: 0 },
        { icon: "🌿", title: "Hobbies", count: 0 },
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

                <p>{item.count}</p>
            </div>
            ))}
        </div>
    )
}