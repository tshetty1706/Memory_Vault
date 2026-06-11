import { useEffect, useState } from "react";
import "./Movies.css"
import MovieHeader from "./MovieHeader";
import MovieSearch from "./MovieSearch";
import MovieCard from "./MovieCard";
import Form from "./Form";
import EditMovie from "./EditMovie";

export default function Movies({ darkMode }) {
  const [editingMovie, setEditingMovie] = useState(null);

  const [movies, setMovies] = useState([]);

  const [genre, setGenre] = useState("All");

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false); 

  const [formData, setFormData] =
    useState({
      title: "",
      image: "",
      genre: "Sci-Fi",
      rating: "",
      note: "",
    });

  useEffect(() => {

    const storedMovies =
      JSON.parse(
        localStorage.getItem("movies")
      ) || [];

    setMovies(storedMovies);

  }, []);

  

  const filteredMovies =
        movies.filter((movie) => {
    
          const matchSearch =
            movie.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );
    
          const matchGenre =
            genre === "All"
              ? true
              : movie.genre === genre;
    
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

      <MovieHeader darkMode={darkMode} setShowForm={setShowForm} />

      <MovieSearch search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} />

      <MovieCard filteredMovies={filteredMovies} movies={movies} setMovies={setMovies} editingMovie={editingMovie}
            setEditingMovie={setEditingMovie}/>

      {
        editingMovie && (
          <EditMovie
            editingMovie={editingMovie}
            setEditingMovie={setEditingMovie}
            movies={movies}
            setMovies={setMovies}
          />
        )
      }

      <Form setShowForm={setShowForm} formData={formData} setFormData={setFormData} showForm={showForm} movies={movies} setMovies={setMovies} />

    </div>
  );
}