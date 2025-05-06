import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { MenuLateral } from "../../components/menuLateral/MenuLateral";
import CardProductos from "../../components/card_Producto/CardProductos";
import { productos } from "../../services/database";
import "./productos.css";

export default function Productos() {
  const navigate = useNavigate();
  const categorias = ["Todos", "categoria1", "categoria2", "categoria3"];
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animacionActiva, setAnimacionActiva] = useState(false);

  const toggleMenu = () => {
    if (menuAbierto) {
      setAnimacionActiva(true);
      setTimeout(() => {
        setMenuAbierto(false);
        setAnimacionActiva(false);
      }, 400);
    } else {
      setMenuAbierto(true);
    }
  };

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
      <Link to="/">
        <FaArrowLeft className="flecha-regresar" />
      </Link>

      <button
        className={
          menuAbierto
            ? "menu-hamburguesa-producto menu-hamburguesa-producto-desplegado"
            : "menu-hamburguesa-producto"
        }
        onClick={toggleMenu}
      >
        ☰
      </button>

      <MenuLateral
        menuAbierto={menuAbierto}
        animacionActiva={animacionActiva}
        tipo="productos"
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
        onToggleMenu={toggleMenu}
      />

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
