import React from "react";
import "./css/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Movie App. All rights reserved.</p>
    </footer>
  );
};
