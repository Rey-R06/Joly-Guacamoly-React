import "./login.css";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { alertaError, alertaRedireccion, generarToken } from "../../helpers/funciones";
let apiAdmins = "http://localhost:3001/admins";

export default function Login() {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  const [contraseña, setContraseña] = useState("");
  let navigate = useNavigate();

  
  function getUsuarios() {
    fetch(apiAdmins)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUsuarios();
  }, []);
  
  function buscarUsuario() {
    let usuarioEncontrado = usuarios.find(
      (usuario) =>
        user == usuario.user && contraseña == usuario.password
    );
    return usuarioEncontrado;
  }

  function inicioSesion() {
    if (buscarUsuario()) {
      let tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(buscarUsuario()));
      alertaRedireccion(
        navigate,
        "Bienvenido " + buscarUsuario().nombre,
        "En breves segundos será redireccionado al Home",
        "success",
        "/admin-home"
      );
    } else {
      alertaError();
    }
  }
  

  return (
    <>
      <main className="contenedor-form">
        <Link to="/">
          <FaArrowLeft className="flecha-regresar" />
        </Link>
        <form className="form">
          <span className="title">Inicio sesión</span>
          <label htmlFor="username" className="label">
            Nombre
          </label>
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            id="username"
            name="username"
            required
            className="input"
          />
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            onChange={(e) => setContraseña(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
            className="input"
          />
          <button type="button" onClick={inicioSesion} className="submit">
            Iniciar sesion
          </button>
          <p className="signup-link">
            No tienes cuenta?
            <Link to="/registrarse">Registrarse</Link>
          </p>
        </form>
      </main>
    </>
  );
}
