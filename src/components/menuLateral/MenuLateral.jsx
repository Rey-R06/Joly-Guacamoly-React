import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import "./menuLateral.css"

export const MenuLateral = ({ 
  menuAbierto, 
  animacionActiva, 
  tipo = "productos", // 'productos' o 'carrito'
  categorias = [], 
  categoriaActiva, 
  setCategoriaActiva,
  onToggleMenu 
}) => {
  return (
    <aside className={menuAbierto ? (animacionActiva ? "menu-oculto-carrito" : "menu-abierto-carrito") : "contenedor-left"}>
      <section className="contenedor-logo-productos">
        <Link to="/">
          <img src="/img/logos/joly-logo.png" alt="logo jolyGuacamoly" />
        </Link>
      </section>

      <nav className={menuAbierto ? "categorias-desplegable" : "categorias"}>
        <ul>
          {tipo === "productos" ? (
            <>
              {categorias.map((categoria, index) => (
                <li key={index}>
                  <button
                    className={`boton-categoria ${categoriaActiva === categoria ? "categoria-seleccionada" : ""}`}
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
            </>
          ) : (
            <li className="carrito-li">
              <Link className="boton-categoria-carrito" to="/productos">
                <FaArrowLeft className="icono-regresar" size={20} />
                <span>Volver a comprar</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};