export default function HobbyHeader({darkMode,setShowForm}){
    return(
        <div className="movies-header">

            <div>
            <h1>🌿 Hobby Collection</h1>

            <p>
                Things that define who you are....
            </p>
            </div>

            <button
                className="add-btn"
                onClick={() =>
                    setShowForm(true)
                }
                >
                + Add Hobby
            </button>

        </div>
    )
}