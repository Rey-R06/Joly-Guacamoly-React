import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import "./header.css"

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navegador = useNavigate();

  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
  }


  return (
    <header>
        <button class="menu-hamburguesa" onClick={toggleMenu}>
            ☰
        </button>
        <section class="contenedor-logo">
          <section class="logo">
            <img src="/img/logos/joly-logo.png" alt="" />
          </section>
        </section>

      <nav class="menu">
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
