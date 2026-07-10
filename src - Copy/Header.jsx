import React from "react";
import "./css/Header.css";

export const Header = ({ active = "popular", onChange = () => {} }) => {
  return (
    <div className="header-container">
      <div>
        <h1 className="header-title">Movie App</h1>
      </div>
      <div className="nav-links">
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
    </div>
  );
};
