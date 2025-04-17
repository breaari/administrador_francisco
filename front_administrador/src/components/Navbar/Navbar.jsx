import React, { useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import "./NavBar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show bg-warning" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Autogestión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lista_de_espera">Lista de espera</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
