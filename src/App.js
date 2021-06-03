import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);

  // On Component Mount
  useEffect(() => {
    getMovies();
  }, []);

  // Create
  const onSubmitBook = async e => {
    e.preventDefault();
    const { movie } = e.target;
    await axios.post("/api/movies", {
      title: movie.value
    });
    movie.value = "";
    getMovies();
  };

  // Read
  const getMovies = async () => {
    const res = await axios.get("/api/movies");
    const data = res.data;
    setMovies(data.movies);
  };
  if (movies.length === 0) return <div>loading...</div>;
  return (
    <div className="App">
      <div>{movies[0]}</div>
      <form onSubmit={e => onSubmitBook(e)}>
        <label htmlFor="movie">Movie Title:</label>
        <input type="text" name="movie" />
        <button>Add Movie</button>
      </form>
    </div>
  );
}
export default App;
