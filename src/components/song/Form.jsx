export default function Form({setShowForm,formData,setFormData,showForm,song,setSong, genres}){
    function saveSong() {

        const newSong = {
        id: Date.now(),
        ...formData,
        };

        const updatedSong = [
        ...song,
        newSong,
        ];

        setSong(updatedSong);

        localStorage.setItem(
        "song",
        JSON.stringify(updatedSong)
        );

        setShowForm(false);

        setFormData({
        title: "",
        image: "",
        genre: "",
        rating: "",
        favourite_line: ""
        });
    }

    return(
        <>
            {showForm && (

                <div className="modal">

                <div className="modal-content" style={{ padding: "2rem" }}>

                    <h2>Add Song</h2>

                    <input
                    placeholder="Song Name"
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
                    {
                        genres.map((ele) => (
                        <option key={ele}>{ele}</option>
                        ))
                    }
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
                    placeholder="Favourite Lyrics?"
                    value={formData.favourite_line}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        favourite_line:
                        e.target.value
                        })
                    }
                    />

                    <div className="modal-actions">

                    <button
                        onClick={saveSong}
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