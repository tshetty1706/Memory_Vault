import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function MovieCard({
  filteredMovies, movies, setMovies, editingMovie,
  setEditingMovie}) {
    
    const deleteMovie = (id) => {
        const newMovies = movies.filter((ele) => ele.id !== id);
        localStorage.setItem("movies", JSON.stringify(newMovies));
        setMovies([]);
        setMovies(newMovies);
    }

  return (

    <div className="movies-grid">

        {filteredMovies.map(
          (movie) => (
            <div
              key={movie.id}
              className="movie-card"
            >

              <img
                src={movie.image}
                alt={movie.title}
              />

              <div className="movie-content">

                <div className="movie-header">
                    <h3>
                        {movie.title.toUpperCase()}
                    </h3>

                    <div className="movie-actions">
                      <button
                        className="icon-btn delete"
                        aria-label={`Delete ${movie.title}`}
                        title={`Delete ${movie.title}`}
                        onClick={()=>{
                            console.log(movie.id)
                            deleteMovie(movie.id)
                        }}
                      >
                        <MdDelete />
                      </button>

                      <button
                        className="icon-btn edit"
                        aria-label={`Edit ${movie.title}`}
                        title={`Edit ${movie.title}`}
                        onClick={()=>{
                            setEditingMovie(movie);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                </div>

                <span>
                  {movie.genre}
                </span>

                <p>
                  ⭐ {movie.rating}/10
                </p>

                <small>
                  {movie.note}
                </small>

              </div>

            </div>
          )
        )}

      </div>
  );
}