import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function HobbyCard({
  filteredMovies, hobbies, setHobbies, editingHobby,
  setEditingHobby}) {
    
    const deleteMovie = (id) => {
        const newHobby = hobbies.filter((ele) => ele.id !== id);
        localStorage.setItem("hobby", JSON.stringify(newHobby));
        setHobbies([]);
        setHobbies(newHobby);
    }

  return (

    <div className="movies-grid">

        {filteredMovies.map(
          (hobby) => (
            <div
              key={hobby.id}
              className="movie-card"
            >

              <img
                src={hobby.image}
                alt={hobby.title}
              />

              <div className="movie-content">

                <div className="movie-header">
                    <h3>
                        {hobby.title.toUpperCase()}
                    </h3>

                    <div className="movie-actions">
                      <button
                        className="icon-btn delete"
                        aria-label={`Delete ${hobby.title}`}
                        title={`Delete ${hobby.title}`}
                        onClick={()=>{
                            console.log(hobby.id)
                            deleteMovie(hobby.id)
                        }}
                      >
                        <MdDelete />
                      </button>

                      <button
                        className="icon-btn edit"
                        aria-label={`Edit ${hobby.title}`}
                        title={`Edit ${hobby.title}`}
                        onClick={()=>{
                            setEditingHobby(hobby);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                </div>

                <span>
                  <span style={{color:"white"}}>Category: </span>{hobby.category}
                </span>

                <small >
                  <span style={{color:"white", fontSize:"15px"}}>Why do you love this Hobby?</span><br/>
                  {hobby.description}
                </small>

              </div>

            </div>
          )
        )}

      </div>
  );
}