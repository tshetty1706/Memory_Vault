import { useState } from "react";
import './EditSong.css'

export default function EditSong({
  editingSong,
  setEditingSong,
  song,
  setSong,
  genres
}) {

  const [formData, setFormData] =
    useState(editingSong);

  const saveChanges = () => {

    const updatedSong =
      song.map((song) =>
        song.id === formData.id
          ? formData
          : song
      );

    localStorage.setItem(
      "song",
      JSON.stringify(updatedSong)
    );

    setSong(updatedSong);

    setEditingSong(null);
  };

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        <h2>Edit Song</h2>

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
          {
              genres.map((ele) => (
              <option key={ele}>{ele}</option>
              ))
          }
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
          value={formData.favourite_line}
          onChange={(e)=>
            setFormData({
              ...formData,
              favourite_line:e.target.value
            })
          }
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={() =>
              setEditingSong(null)
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