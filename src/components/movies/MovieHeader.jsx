export default function MovieHeader({darkMode,setShowForm}){
    return(
        <div className="movies-header">

            <div>
            <h1>🎬 Movies Collection</h1>

            <p>
                Store stories that
                shaped you.
            </p>
            </div>

            <button
                className="add-btn"
                onClick={() =>
                    setShowForm(true)
                }
                >
                + Add Movie
            </button>

        </div>
    )
}