import "./loginYRegistro.css";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  alertaError,
  alertaRedireccion,
  generarToken,
} from "../../helpers/funciones";
let apiAdmins = "http://localhost:3001/admins";
let apiClientes = "http://localhost:3001/clientes";

export default function Login() {
  const [admins, setAdmins] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [user, setUser] = useState("");
  const [contraseña, setContraseña] = useState("");
  let navigate = useNavigate();

  function getAdmins() {
    fetch(apiAdmins)
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getAdmins();
  }, []);

  function getClientes() {
    fetch(apiClientes)
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getClientes();
  }, []);

  function buscarUsuario() {
    let clienteEncontrado = clientes.find(
      (cliente) => user == cliente.user && contraseña == cliente.password
    );

    let adminEncontrado = admins.find(
      (admin) => user == admin.user && contraseña == admin.password
    );

    if (adminEncontrado) {
      return { usuario: adminEncontrado, ruta: "/admin-home" };
    } else if (clienteEncontrado) {
      return { usuario: clienteEncontrado, ruta: "/cliente-home" };
    } else {
      return null;
    }
  }

  function inicioSesion() {
    if (buscarUsuario()) {
      let tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(buscarUsuario().usuario));
      alertaRedireccion(
        navigate,
        "Bienvenido " + buscarUsuario().usuario.nombre,
        "En breves segundos será redireccionado al Home",
        "success",
        buscarUsuario().ruta
      );
    } else {
      alertaError("Usuario y/o contraseña incorrecta");
    }
  }

  return (
    <>
      <main className="contenedor-form">
        <FaArrowLeft onClick={() => navigate("/")} className="flecha-regresar" />
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
