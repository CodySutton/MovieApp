import React, { useState } from "react";
import "./css/Header.css";

export const Header = ({ active = "popular", onChange = () => {} }) => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  return (
    <div
      className={`header-container ${isMobileNavActive ? "mobile-nav-active" : ""}`}
    >
      <div className="header-brand">
        <h1 className="header-title">Movie App</h1>
      </div>
      <div className="nav-links">
        <div
          className="desktop-nav"
          role="navigation"
          aria-label="Movie categories"
        >
          <button
            className={active === "popular" ? "active" : ""}
            onClick={() => onChange("popular")}
          >
            Popular Movies
          </button>
          <button
            className={active === "top_rated" ? "active" : ""}
            onClick={() => onChange("top_rated")}
          >
            Top Rated Movies
          </button>
          <button
            className={active === "upcoming" ? "active" : ""}
            onClick={() => onChange("upcoming")}
          >
            Upcoming Movies
          </button>
        </div>

        <label className="mobile-nav" htmlFor="movie-category-select">
          <span className="sr-only">Choose a movie category</span>
          <select
            id="movie-category-select"
            value={active}
            onFocus={() => setIsMobileNavActive(true)}
            onBlur={() => setIsMobileNavActive(false)}
            onChange={(event) => onChange(event.target.value)}
            aria-label="Select movie category"
          >
            <option value="popular">Popular Movies</option>
            <option value="top_rated">Top Rated Movies</option>
            <option value="upcoming">Upcoming Movies</option>
          </select>
        </label>
      </div>
    </div>
  );
};
