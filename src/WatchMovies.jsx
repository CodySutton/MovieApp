import React, { useState } from "react";
import "./css/WatchMovies.css";

export const WatchMovies = ({ movies = [] }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!movies || movies.length === 0)
    return <div className="watch-movies">No movies to show</div>;

  return (
    <div className="watch-movies">
      {movies.map((movie) => {
        const isExpanded = Boolean(expanded[movie.id]);
        return (
          <div
            className={`movie-card ${isExpanded ? "expanded" : ""}`}
            key={movie.id}
          >
            {movie.poster && (
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="movie-poster"
              />
            )}
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-date">{movie.release_date}</p>
              <p className={`movie-desc ${isExpanded ? "expanded" : ""}`}>
                {movie.description}
              </p>
              <button
                className="read-more"
                aria-expanded={isExpanded}
                onClick={() => toggleExpanded(movie.id)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
