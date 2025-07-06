import { useState } from "react";
import { searchMovies } from "../api";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await searchMovies(query);
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setError("No movies found.");
        setMovies([]);
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Search Movies</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <p>{movie.Title} ({movie.Year})</p>
              <img src={movie.Poster} alt={movie.Title} width="100" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
