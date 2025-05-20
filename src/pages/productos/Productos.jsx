import React, { useState, useEffect } from 'react';
import CardProductos from '../../components/card_Producto/CardProductos';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Productos.css';

function Productos() {
  // Datos de productos locales
  const productosData = [
    {
      id: 1,
      nombre: "Guacamole Clásico",
      descripcion: "Tradicional receta con aguacates frescos",
      precio: 15000,
      precioOriginal: 18000,
      imagen: "/img/productos/natural.png",
      categoria: "Guacamoles",
      oferta: true
    },
    {
      id: 2,
      nombre: "Hummus Especial",
      descripcion: "Versión picante para los amantes a lo picante",
      precio: 12000,
      imagen: "/img/productos/humus.png",
      categoria: "Hummus",
      oferta: false
    },
    {
      id: 3, 
      nombre: "Guacamole Picante",
      descripcion: "Con toque de chile habanero y cilantro fresco",
      precio: 10000,
      imagen: "/img/productos/picante.png",
      categoria: "Guacamoles"
    }
  ];

  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const categorias = ['Todos', ...new Set(productosData.map(p => p.categoria))];

  const productosFiltrados = categoriaActiva === 'Todos' 
    ? productosData 
    : productosData.filter(p => p.categoria === categoriaActiva);

  return (
    <>
    <Header />
    <main className="main-productos">
      {/* Hero Section */}
      <section className="hero-productos" >
        <h2>Nuestros Sabores Artesanales</h2>
        <p>Hechos con ingredientes 100% naturales</p>
      </section>

      {/* Filtros */}
      <div className="filtros-container">
        {categorias.map(categoria => (
          <button
            key={categoria}
            className={`filtro-btn ${categoria === categoriaActiva ? 'active' : ''}`}
            onClick={() => setCategoriaActiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <section className="grid-productos">
        {productosFiltrados.map(producto => (
          <CardProductos key={producto.id} producto={producto} />
        ))}
      </section>
    </main>
    <Footer />
    </>
  );
};

export default Productos;