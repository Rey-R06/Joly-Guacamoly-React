import React, { useState } from "react";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CardProductos from "../../components/card_Producto/CardProductos";
import "./productos.css";

export default function Productos() {
  const navigate = useNavigate();
  const categorias = ["Todos", "Categoría 1", "Categoría 2", "Categoría 3"];
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  return (
    <div className="contenedor-contenido">
      <FaArrowLeft
        className="flecha-regresar"
        onClick={() => navigate(-1)}
      />

      <aside className="contenedor-left">
        <section className="contenedor-logo">
          <Link to="/">
            <img src="/img/logos/joly-logo.png" alt="logo jolyGuacamoly" />
          </Link>
        </section>

        <nav className="categorias">
          <ul>
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
                <FaShoppingCart size={20} />
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
          <CardProductos
            clase="card-productos"
            titulo="guacamole natural"
            img="/img/productos/producto-natural.png"
            descripcion=""
            mensajeButton="comprar"
          />
          <CardProductos
            clase="card-productos"
            titulo="guacamole Picante"
            img="/img/productos/producto-picante.png"
            descripcion=""
            mensajeButton="comprar"
          />
        </section>
      </main>
    </div>
  );
}
