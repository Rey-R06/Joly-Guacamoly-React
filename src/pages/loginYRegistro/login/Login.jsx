import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  alertaError,
  alertaRedireccion,
  generarToken,
} from "../../../helpers/funciones";
import "../loginYRegistro.css";
let apiUsuarios = "http://localhost:8080/usuarios";

export default function Login() {
  const [usuarios, setUsuario] = useState([]);
  const [user, setUser] = useState("");
  const [contraseña, setContraseña] = useState("");
  let navigate = useNavigate();

  function getUsuarios() {
    fetch(apiUsuarios)
      .then((response) => response.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  function buscarUsuario() {
    let usuario = usuarios.find(
      (usuario) => user === usuario.nombre && contraseña === usuario.contraseña
    );

    console.log("Usuario encontrado:", usuario);

    if (!usuario) return null;

    if (usuario.rol !== "Cliente") {
      return { usuario: usuario, ruta: "/admin-home" };
    } else {
      return { usuario: usuario, ruta: "/cliente-home" };
    }
  }

  function inicioSesion() {
    const resultado = buscarUsuario();

    if (resultado && resultado.usuario) {
      let tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));
      alertaRedireccion(
        navigate,
        "Bienvenido " + resultado.usuario.nombre,
        "En breves segundos será redireccionado al Home",
        "success",
        resultado.ruta
      );
    } else {
      alertaError("Usuario y/o contraseña incorrecta");
    }
  }

  return (
    <>
      <main className="contenedor-form">
        <FaArrowLeft
          onClick={() => navigate("/")}
          className="flecha-regresar"
        />
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
