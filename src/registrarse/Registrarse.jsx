import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./registro.css";

export default function Registrarse() {
  return (
    <>
      <main className="contenedor-form">
        <Link to="/">
          <FaArrowLeft className="flecha-regresar" />
        </Link>
        <form className="form">
          <span className="title">Registrarse</span>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="input"
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input"
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="input"
          />
          <button type="submit" className="submit">
            Register
          </button>
          <p className="signup-link">
            Ya tienes cuenta?
            <Link to="/login">Iniciar Sesion</Link>
          </p>
        </form>
      </main>
    </>
  );
}
