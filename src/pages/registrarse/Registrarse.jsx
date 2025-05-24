import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertaRedireccion, alertaError } from "../../helpers/funciones";
import "./registro.css";
let apiClientes = "http://localhost:3001/clientes";

export default function Registrarse() {
  const [clientes, setClientes] = useState([])
  const [nombre, setNombre] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function getClientes() {
    fetch(apiClientes)
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getClientes();
  }, []);

  function registrarCliente() {
  let emailYaRegistrado = clientes.some(cliente => cliente.email === email);
  
  if (emailYaRegistrado) {
    return alertaError("Email ya registrado, pruebe con otro.");
  }
    let nuevoCliente = {
      nombre: nombre,
      user: user,
      email: email,
      password: password,
      telefono: "",
      favoritos: [],
      historialPedidos: [],
    };
    fetch(apiClientes, {
      method: "POST",
      body: JSON.stringify(nuevoCliente),
    })
      .then(() => {
        alertaRedireccion(
          navigate,
          "Te has registrado correctamente",
          "Ahora inicia sesion....",
          "success",
          "/login"
        );
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <main className="contenedor-form">
        <FaArrowLeft onClick={() => navigate(-1)} className="flecha-regresar" />
        <form className="form">
          <span className="title">Registrarse</span>
          <label htmlFor="username" className="label">
            Nombre
          </label>
          <input
            onChange={(e) => setNombre(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
            className="input"
          />
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
            className="input"
          />
          <label htmlFor="password" className="label">
            Nombre usuario
          </label>
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            id="usuario"
            name="usuario"
            required
            className="input"
          />
          <button type="button" className="submit" onClick={registrarCliente}>
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
