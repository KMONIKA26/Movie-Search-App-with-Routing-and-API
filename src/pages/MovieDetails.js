import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getMovieById(id);
        if (res.data.Response === "True") {
          setMovie(res.data);
        } else {
          setError("Movie not found.");
        }
      } catch {
        setError("Failed to fetch movie.");
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
}
export default MovieDetails;
