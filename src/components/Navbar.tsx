import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4 w-full">
      <div className="nav-links">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/calculator">Calculator</Link>
        </div>
        <div>
          <Link to="/search">Search</Link>
        </div>
        <div>
          <Link to="/tbd">TBD</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
