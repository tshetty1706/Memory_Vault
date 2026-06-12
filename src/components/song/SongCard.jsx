import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function SongCard({
  filteredSong, song, setSong, editingSong,
  setEditingSong}) {
    
    const deleteSong = (id) => {
        const newSong = song.filter((ele) => ele.id !== id);
        localStorage.setItem("song", JSON.stringify(newSong));
        setSong([]);
        setSong(newSong);
    }

  return (

    <div className="movies-grid">

        {filteredSong.map(
          (song) => (
            <div
              key={song.id}
              className="movie-card"
            >

              <img
                src={song.image}
                alt={song.title}
              />

              <div className="movie-content">

                <div className="movie-header">
                    <h3>
                        {song.title.toUpperCase()}
                    </h3>

                    <div className="movie-actions">
                      <button
                        className="icon-btn delete"
                        aria-label={`Delete ${song}`}
                        title={`Delete ${song}`}
                        onClick={()=>{
                            console.log(song.id)
                            deleteSong(song.id)
                        }}
                      >
                        <MdDelete />
                      </button>

                      <button
                        className="icon-btn edit"
                        aria-label={`Edit ${song.title}`}
                        title={`Edit ${song.title}`}
                        onClick={()=>{
                            setEditingSong(song);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                </div>

                <span>
                  <span style={{color:"white"}}>Genre: </span>{song.genre}
                </span>

                <p>
                  ⭐ {song.rating}/10
                </p>
                
                <small >
                  <span style={{color:"white", fontSize:"15px"}}>Favourite Lyrics?</span><br/>
                  {song.favourite_line}
                </small>

              </div>

            </div>
          )
        )}

      </div>
  );
}