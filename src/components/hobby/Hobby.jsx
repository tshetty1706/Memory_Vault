import { useEffect, useState } from "react";
import "./Hobby.css"

import HobbyHeader from "./HobbyHeader";
import HobbySearch from "./HobbySearch";
import HobbyCard from "./HobbyCard";
import Form from "./Form";
import EditHobby from "./EditHobby";

export default function Hobby({ darkMode }) {
  const [editingHobby, setEditingHobby] = useState(null);

  const [hobbies, setHobbies] = useState([]);

  const [category, setCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false); 

  const [formData, setFormData] =
    useState({
      title: "",
      image: "",
      category: "",
      description: ""
    });

    const categories = [
        "All",
        "Technology",
        "Sports",
        "Music",
        "Art",
        "Fitness",
        "Reading",
        "Gaming",
        "Travel",
        "Cooking",
        "Other"
      ];

  useEffect(() => {

    const storedHobby =
      JSON.parse(
        localStorage.getItem("hobby")
      ) || [];

    setHobbies(storedHobby);

  }, []);

  

  const filteredMovies =
        hobbies.filter((hobbies) => {
    
          const matchSearch =
            hobbies.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );
    
          const matchGenre =
            category === "All"
              ? true
              : movie.genre === category;
    
          return (
            matchSearch &&
            matchGenre
          );
        });


  return (
    <div
      className={`movies-page ${
        darkMode
          ? "movies-dark"
          : "movies-light"
      }`}
    >

      <HobbyHeader darkMode={darkMode} setShowForm={setShowForm} />

      <HobbySearch search={search} setSearch={setSearch} category={category} setCategory={setCategory} categories={categories}/>

      <HobbyCard filteredMovies={filteredMovies} hobbies={hobbies} setHobbies={setHobbies} editingHobby={editingHobby}
            setEditingHobby={setEditingHobby}/>

      {
        editingHobby && (
          <EditHobby
            editingHobby={editingHobby}
            setEditingHobby={setEditingHobby}
            hobbies={hobbies}
            setHobbies={setHobbies}
            categories={categories}
          />
        )
      }

      <Form setShowForm={setShowForm} formData={formData} setFormData={setFormData} showForm={showForm} hobbies={hobbies} setHobbies={setHobbies} categories={categories} />

    </div>
  );
}