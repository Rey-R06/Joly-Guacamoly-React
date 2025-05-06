import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CardProductos from "../../components/card_Producto/CardProductos";
import { productos } from "../../services/database";
import "./productos.css";

export default function Productos() {
  const navigate = useNavigate();
  const categorias = ["Todos", "categoria1", "categoria2", "categoria3"];
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const [menuAbierto, setMenuAbierto] = useState(false);
const [animacionActiva, setAnimacionActiva] = useState(false);

function toggleMenu() {
  if (menuAbierto) {
    setAnimacionActiva(true);
    setTimeout(() => {
      setMenuAbierto(false);
      setAnimacionActiva(false);
    }, 400);
  } else {
    setMenuAbierto(true);
  }
}

//Esta parte nos ayuda a que si el menu esta abierto y la pantalla pasa de 700px regresa al menu normal
useEffect(() => {
  const mediaQuery = window.matchMedia("(min-width: 700px)");

  const handleResize = () => {
    if (mediaQuery.matches) {
      setMenuAbierto(false);
      setAnimacionActiva(false);
    }
  };

  mediaQuery.addEventListener("change", handleResize);
  return () => mediaQuery.removeEventListener("change", handleResize);
}, []);
  

  return (
    <div className="contenedor-contenido">
      <FaArrowLeft className="flecha-regresar" onClick={() => navigate(-1)} />

        <button className={menuAbierto ? "menu-hamburguesa-producto menu-hamburguesa-producto-desplegado" : "menu-hamburguesa-producto"} onClick={toggleMenu}>
            ☰
        </button>

      <aside className={menuAbierto ? (animacionActiva ? "menu-oculto" : "menu-abierto") : "contenedor-left"}>
        <section className="contenedor-logo-productos">
          <Link to="/">
            <img src="/img/logos/joly-logo.png" alt="logo jolyGuacamoly" />
          </Link>
        </section>

        <nav className={menuAbierto ? "categorias-desplegable" : "categorias"}>
          <ul>
            {categorias.map((categoria, index) => (
              <li key={index}>
                <button
                  className={`boton-categoria ${
                    categoriaActiva === categoria
                      ? "categoria-seleccionada"
                      : ""
                  }`}
                  onClick={() => setCategoriaActiva(categoria)}
                >
                  {categoria}
                </button>
              </li>
            ))}

            <li>
              <Link className="seleccionar-carrito" to="/carrito">
                <FaShoppingCart className="icono-carrito" size={20} />
                <span>Carrito</span>
                <span className="contador-carrito">0</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="contenedor-productos">
        <h2 className="titulo">{categoriaActiva}</h2>
        <section className="productos">
          {productos
            .filter(
              (producto) =>
                categoriaActiva === "Todos" ||
                producto.categoria === categoriaActiva
            )
            .map((producto) => (
              <CardProductos
                key={producto.id}
                clase="card-productos"
                titulo={producto.nombre}
                img={producto.img}
                descripcion={`$${producto.precio}`} 
                mensajeButton="Añadir" 
              />
            ))}
        </section>
      </main>
    </div>
  );
}
