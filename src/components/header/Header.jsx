import { useNavigate } from 'react-router-dom';
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
        <section className="contenedor-logo">
          <section className="logo">
            <img onClick={() => navegador("/")} src="/img/logos/joly-logo.png" alt="" />
          </section>
        </section>

      <nav className={menuAbierto ? (animacionActiva ? "menu-oculto" : "menu-abierto") : "oculto"}>
          <ul>
          <li><button onClick={() => navegador("/")}>Inicio</button></li>
          <li><button onClick={() => navegador("/productos")}>Productos</button></li>
          <li><button onClick={() => navegador("/clientes")}>Clientes</button></li>
          <li><button onClick={() => navegador("/login")}>Login</button></li>
          </ul>
      </nav>
    </header>
  )
}
