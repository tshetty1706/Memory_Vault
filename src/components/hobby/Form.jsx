export default function Form({setShowForm,formData,setFormData,showForm,hobbies,setHobbies, categories}){
    function saveHobby() {

        const newHobby = {
        id: Date.now(),
        ...formData,
        };

        const updatedHobby = [
        ...hobbies,
        newHobby,
        ];

        setHobbies(updatedHobby);

        localStorage.setItem(
        "hobby",
        JSON.stringify(updatedHobby)
        );

        setShowForm(false);

        setFormData({
        title: "",
        image: "",
        category: "",
        description: ""
        });
    }

    return(
        <>
            {showForm && (

                <div className="modal">

                <div className="modal-content" style={{ padding: "2rem" }}>

                    <h2>Add Hobby</h2>

                    <input
                    placeholder="Hobby Name"
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
                    value={formData.category}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        category:
                        e.target.value
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
                    placeholder="Why do you love this Hobby?"
                    value={formData.description}
                    onChange={(e)=>
                        setFormData({
                        ...formData,
                        description:
                        e.target.value
                        })
                    }
                    />

                    <div className="modal-actions">

                    <button
                        onClick={saveHobby}
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