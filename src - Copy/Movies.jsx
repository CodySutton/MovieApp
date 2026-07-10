import React, { useEffect, useState, useMemo } from "react";
import "./css/Movies.css";
import { WatchMovies } from "./WatchMovies";

export const Movies = ({ category = "popular" }) => {
  const baseOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2M0OTQwZDZlNWEwYTg4Y2E0OGRkODk3NmE4MGFmYSIsIm5iZiI6MTc2NTgxNTk4MC43NDQsInN1YiI6IjY5NDAzNmFjNmIwNWNkMzEwNjgxNmEwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RauWwWbqOymW_UYigpkPApaYFnAGQRB7qZxxA2n8Rqs",
    },
  };

  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);
    setMovies([]);

    const endpoint = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

    fetch(endpoint, { ...baseOptions, signal })
      .then((res) => res.json())
      .then((json) => {
        if (json && Array.isArray(json.results)) {
          const results = json.results.slice(0, 20);
          const posterBase = "https://image.tmdb.org/t/p/w500";

          const mapped = results.map((m) => ({
            id: m.id,
            title: m.title || m.name || m.original_title || "",
            release_date: m.release_date || m.first_air_date || "",
            description: (m.overview || "").trim(),
            poster: m.poster_path ? posterBase + m.poster_path : null,
            rating: m.vote_average ?? 0,
          }));

          setMovies(mapped);
          console.log(
            `${category} movie titles:`,
            mapped.map((m) => m.title)
          );
        } else {
          setMovies([]);
          setError(new Error("Unexpected API response"));
          console.log("Unexpected API response:", json);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // fetch was aborted on unmount
        console.error(err);
        setError(err);
        setMovies([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [category]);

  return (
    <>
      <div>
        <select
          name="sortBy"
          id="sort-by"
          className="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option className="sort-by-options" value="date">
            Date
          </option>
          <option className="sort-by-options" value="rating">
            Rating
          </option>
        </select>
        <select
          name="order"
          id="order"
          className="assort-by"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option className="assort-by" value="asc">
            Ascending
          </option>
          <option className="assort-by" value="desc">
            Descending
          </option>
        </select>
      </div>
      <div>
        {loading && <div className="loading">Loading {category} movies...</div>}
        {error && <div className="error">Error loading movies</div>}
        <WatchMovies
          movies={useMemo(() => {
            const copy = [...movies];
            if (sortBy === "date") {
              copy.sort((a, b) => {
                const da = new Date(a.release_date).getTime() || 0;
                const db = new Date(b.release_date).getTime() || 0;
                return order === "asc" ? da - db : db - da;
              });
            } else if (sortBy === "rating") {
              copy.sort((a, b) => {
                const ra = a.rating ?? 0;
                const rb = b.rating ?? 0;
                return order === "asc" ? ra - rb : rb - ra;
              });
            }
            return copy;
          }, [movies, sortBy, order])}
        />
      </div>
    </>
  );
};
