import { useState } from "react";
import './EditMovie.css'

export default function EditMovie({
  editingMovie,
  setEditingMovie,
  movies,
  setMovies,
}) {

  const [formData, setFormData] =
    useState(editingMovie);

  const saveChanges = () => {

    const updatedMovies =
      movies.map((movie) =>
        movie.id === formData.id
          ? formData
          : movie
      );

    localStorage.setItem(
      "movies",
      JSON.stringify(updatedMovies)
    );

    setMovies(updatedMovies);

    setEditingMovie(null);
  };

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        <h2>Edit Movie</h2>

        <input
          value={formData.title}
          onChange={(e)=>
            setFormData({
              ...formData,
              title:e.target.value
            })
          }
        />

        <input
          value={formData.image}
          onChange={(e)=>
            setFormData({
              ...formData,
              image:e.target.value
            })
          }
        />

        <select
          value={formData.genre}
          onChange={(e)=>
            setFormData({
              ...formData,
              genre:e.target.value
            })
          }
        >
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
          <option>Animation</option>
          <option>Documentary</option>
        </select>

        <input
          type="number"
          value={formData.rating}
          onChange={(e)=>
            setFormData({
              ...formData,
              rating:e.target.value
            })
          }
        />

        <textarea
          value={formData.note}
          onChange={(e)=>
            setFormData({
              ...formData,
              note:e.target.value
            })
          }
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={() =>
              setEditingMovie(null)
            }
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}