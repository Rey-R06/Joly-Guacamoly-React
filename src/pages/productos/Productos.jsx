import React, { useState, useEffect } from 'react';
import CardProductos from '../../components/card_Producto/CardProductos';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './productos.css';

function Productos() {
  
const [productos, setProductos] = useState([]);
const [categoriaActiva, setCategoriaActiva] = useState('Todos');

useEffect(() => {
  fetch('http://localhost:3001/productos')
    .then(res => res.json())
    .then(data => setProductos(data))
    .catch(err => console.error('Error al cargar productos:', err));
}, []);

const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];

const productosFiltrados = categoriaActiva === 'Todos'
  ? productos
  : productos.filter(p => p.categoria === categoriaActiva);
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
