import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProductos from "../../components/card_Producto/CardProductos";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./productos.css";
let apiProductos = "https://product-manager-api-s77y.onrender.com/productos";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  useEffect(() => {
    fetch(apiProductos)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const categorias = [
    "Todos",
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  const productosActivos = productosFiltrados.filter((p) => p.activo === true);

  return (
    <>
      <Header />
      <main className="main-productos">
        {/* Hero Section */}
        <section className="hero-productos">
          <h2>Nuestros Sabores Artesanales</h2>
          <p>Hechos con ingredientes 100% naturales</p>
        </section>

        {/* Filtros */}
        <div className="filtros-container">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`filtro-btn ${
                categoria === categoriaActiva ? "active" : ""
              }`}
              onClick={() => setCategoriaActiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>

        <section className="grid-productos">
          {productosActivos.map((producto) => (
            <CardProductos key={producto.id} producto={producto} />
          ))}
        </section>
        <section className="contenedor-boton-carrto">
        <Link to="/carrito" className="btn-ver-carrito">
          🛒 Ver Carrito
        </Link>

        </section>
      </main>
      <Footer />
    </>
  );
}

export default Productos;
