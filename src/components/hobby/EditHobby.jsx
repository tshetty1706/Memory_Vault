import { useState } from "react";
import './EditHobby.css'

export default function EditHobby({
  editingHobby,
  setEditingHobby,
  hobbies,
  setHobbies,
  categories
}) {

  const [formData, setFormData] =
    useState(editingHobby);

  const saveChanges = () => {

    const updatedHobbies =
      hobbies.map((hobby) =>
        hobby.id === formData.id
          ? formData
          : hobby
      );

    localStorage.setItem(
      "hobby",
      JSON.stringify(updatedHobbies)
    );

    setHobbies(updatedHobbies);

    setEditingHobby(null);
  };

  return (
    <div className="modal-overlay">

      <div className="edit-modal">

        <h2>Edit Hobby</h2>

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
          value={formData.category}
          onChange={(e)=>
            setFormData({
              ...formData,
              category:e.target.value
            })
          }
        >
          {
              categories.map((ele) => (
              <option key={ele}>{ele}</option>
              ))
          }
        </select>


        <textarea
          value={formData.description}
          onChange={(e)=>
            setFormData({
              ...formData,
              description:e.target.value
            })
          }
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={() =>
              setEditingHobby(null)
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