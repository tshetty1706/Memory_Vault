export default function SongHeader({darkMode,setShowForm}){
    return(
        <div className="movies-header">

            <div>
            <h1>🎵 Songs Collection</h1>

            <p>
                The soundtrack of your life....
            </p>
            </div>

            <button
                className="add-btn"
                onClick={() =>
                    setShowForm(true)
                }
                >
                + Add Song
            </button>

        </div>
    )
}