import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./header.css";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animacionActiva, setAnimacionActiva] = useState(false);
  const location = useLocation();

  let usuarioSesion = JSON.parse(localStorage.getItem("usuario"));
  // Obtener la ruta actual sin el slash inicial
  const pathActual = location.pathname.replace("/", "");
  // Definir las rutas que deben mostrarse
  const navItems = [
    { path: "", text: "Inicio" },
    { path: "productos", text: "Productos" },
    { path: "joly", text: "Joly" },
    { path: "recetas", text: "Recetas" },
  ];

  function toggleMenu() {
    if (menuAbierto) {
      // activa animación de cierre
      setAnimacionActiva(true);
      setTimeout(() => {
        setMenuAbierto(false);
        setAnimacionActiva(false);
      }, 400); // dura 0.4s, igual que la animación
    } else {
      setMenuAbierto(true);
    }
  }
  return (
    <header className="header-principal">
      <section className="logo-nav">
        <button className="menu-hamburguesa" onClick={toggleMenu}>
          ☰
        </button>
        <Link className="logo" to="/">
          <img src="/img/logos/Logo_JolyDips.png" alt="Logo JolyDips" />
        </Link>
        <nav
          className={
            menuAbierto
              ? animacionActiva
                ? "menu-oculto"
                : "menu-abierto"
              : "oculto"
          }
        >
          <ul>
            {navItems.map(
              (item) =>
                pathActual !== item.path && (
                  <Link to={`/${item.path}`} key={item.path}>
                    <li>{item.text}</li>
                  </Link>
                )
            )}
          </ul>
        </nav>
      </section>
      <section className="botones-login">
        {usuarioSesion ? (<Link className="usuario-sesion" to={"admin-home"}><h3>{usuarioSesion.user}</h3></Link>) : (
          <>
            <Link to="/login" className="boton-registrarse">
              <p>Login</p>
            </Link>
            <Link to="/registrarse" className="boton-sesion">
              <p>Sign up</p>
            </Link>
          </>
        )}
      </section>
    </header>
  );
}
