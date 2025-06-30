import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertaRedireccion, alertaError } from "../../../helpers/funciones";
import "../loginYRegistro.css";
let apiUsuarios = "https://product-manager-api-production-79d2.up.railway.app/usuarios";

export default function Registrarse() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function getUsuaios() {
    fetch(apiUsuarios)
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getUsuaios();
  }, []);

  function registrarCliente() {
    // Validación: campos obligatorios
    if (!nombre || !email || !telefono || !password) {
      return alertaError("Por favor complete todos los campos.");
    }

    // Validación de email repetido
    let emailYaRegistrado = clientes.some((cliente) => cliente.email === email);
    if (emailYaRegistrado) {
      return alertaError("Email ya registrado, pruebe con otro.");
    }

    // Validación de teléfono
    const telefonoRegex = /^\d{7,15}$/;
    if (!telefonoRegex.test(telefono)) {
      return alertaError(
        "El teléfono debe contener solo números y tener entre 7 y 15 dígitos."
      );
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      return alertaError("Solo se permiten correos de Gmail válidos.");
    }

    let nuevoCliente = {
      nombre: nombre,
      rol: "Cliente",
      email: email,
      contraseña: password,
      telefono: telefono,
      registrado: true,
      historialPedidos: [],
    };

    fetch(apiUsuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoCliente),
    })
      .then((res) => {
        console.log("Respuesta completa:", res);
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => {
        alertaRedireccion(
          navigate,
          "Registro exitoso",
          "Ahora inicia sesión...",
          "success",
          "/login"
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        alertaError("Error al registrar. Intenta nuevamente.");
      });
  }

  return (
    <>
      <main className="contenedor-form">
        <FaArrowLeft
          onClick={() => navigate("/")}
          className="flecha-regresar"
        />
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
          <label className="label">Teléfono</label>
          <input
            className="input"
            id="telefono"
            name="telefono"
            type="tel"
            onChange={(e) => setTelefono(e.target.value)}
          />

          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
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
