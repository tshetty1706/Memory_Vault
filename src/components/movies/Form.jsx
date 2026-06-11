export default function Form({setShowForm,formData,setFormData,showForm,movies,setMovies}){
    function saveMovie() {

        const newMovie = {
        id: Date.now(),
        ...formData,
        };

        const updatedMovies = [
        ...movies,
        newMovie,
        ];

        setMovies(updatedMovies);

        localStorage.setItem(
        "movies",
        JSON.stringify(updatedMovies)
        );

        setShowForm(false);

        setFormData({
        title: "",
        image: "",
        genre: "Sci-Fi",
        rating: "",
        note: "",
        });
    }

    return(
        <>
            {showForm && (

                <div className="modal">

                <div className="modal-content" style={{ padding: "2rem" }}>

                    <h2>Add Movie</h2>

                    <input
                    placeholder="Movie Name"
                    value={formData.title}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        title:
                        e.target.value
                        })
                    }
                    />

                    <input
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        image:
                        e.target.value
                        })
                    }
                    />

                    <select
                    value={formData.genre}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        genre:
                        e.target.value
                        })
                    }
                    >
                    <option>Sci-Fi</option>
                    <option>Action</option>
                    <option>Drama</option>
                    <option>Comedy</option>
                    <option>Animation</option>
                    <option>Rom-Com</option>
                    <option>Horror</option>
                    <option>Fantasy</option>
                    <option>Documentary</option>
                    </select>

                    <input
                    type="number"
                    placeholder="Rating"
                    min="1"
                    max="10"
                    value={formData.rating}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        rating:
                        e.target.value
                        })
                    }
                    />

                    <textarea
                    placeholder="Why do you love this movie?"
                    value={formData.note}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        note:
                        e.target.value
                        })
                    }
                    />

                    <div className="modal-actions">

                    <button
                        onClick={saveMovie}
                    >
                        Save
                    </button>

                    <button
                        onClick={() =>
                        setShowForm(false)
                        }
                    >
                        Cancel
                    </button>

                    </div>

                </div>

                </div>

            )}
        </>
    )
}