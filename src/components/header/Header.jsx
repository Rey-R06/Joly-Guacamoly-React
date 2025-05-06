import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import "./header.css"

export default function Header() {
  const navegador = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
const [animacionActiva, setAnimacionActiva] = useState(false);

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
    <header>
        <button className="menu-hamburguesa" onClick={toggleMenu}>
            ☰
        </button>
        <section className="contenedor-logo-header">
          <section className="logo">
            <img onClick={() => navegador("/")} src="/img/logos/joly-logo.png" alt="" />
          </section>
        </section>
      <nav className={menuAbierto ? (animacionActiva ? "menu-oculto-header" : "menu-abierto-header") : "oculto-header"}>
          <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="clientes">Clientes</Link></li>
          <li><Link to="/login">Login</Link></li>
          </ul>
      </nav>
    </header>
  )
}
