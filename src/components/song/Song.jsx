import { useEffect, useState } from "react";
import "./Song.css"

import SongHeader from "./SongHeader";
import SongSearch from "./SongSearch";
import SongCard from "./SongCard";
import Form from "./Form";
import EditSong from "./EditSong";

export default function Hobby({ darkMode }) {
  const [editingSong, setEditingSong] = useState(null);

  const [song, setSong] = useState([]);

  const [genre, setGenre] = useState("All");

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false); 

  const [formData, setFormData] =
    useState({
      title: "",
      image: "",
      genre: "",
      rating: "",
      favourite_line: ""
    });

    const genres = [
        "All",
        "Rock",
        "Pop",
        "Hip-Hop",
        "Classical",
        "Bollywood",
        "Lo-Fi",
        "Other"
      ];

  useEffect(() => {

    const storedSong =
      JSON.parse(
        localStorage.getItem("song")
      ) || [];

    setSong(storedSong);

  }, []);

  

  const filteredSong =
        song.filter((song) => {
    
          const matchSearch =
            song.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );
    
          const matchGenre =
            genre === "All"
              ? true
              : song.genre === genre;
    
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

      <SongHeader darkMode={darkMode} setShowForm={setShowForm} />

      <SongSearch search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} genres={genres}/>

      <SongCard filteredSong={filteredSong} song={song} setSong={setSong} editingSong={editingSong}
            setEditingSong={setEditingSong}/>

      {
        editingSong && (
          <EditSong
            editingSong={editingSong}
            setEditingSong={setEditingSong}
            song={song}
            setSong={setSong}
            genres={genres}
          />
        )
      }

      <Form setShowForm={setShowForm} formData={formData} setFormData={setFormData} showForm={showForm} song={song} setSong={setSong} genres={genres} />

    </div>
  );
}