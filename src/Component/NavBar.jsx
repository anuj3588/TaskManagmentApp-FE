import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("access-token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white rounded">
      <ul className="navbar-nav ml-auto">
        <button onClick={logOut} className="btn btn-dark text-white nav-link">
        Logout
      </button>
        </ul>
    </nav>
  );
};

export default NavBar;
