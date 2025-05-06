import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./inicio.css";

export default function Inicio() {
  return (
    <>
      <Header />
      <main>
        <section className="banner">
          <img src="/img/banner/jolim2.jpeg" alt="" />
        </section>
        <h2>Productos mas destacados</h2>
        <section className="seccion-productos">
          <article className="card-inicio">
            <h3>guacamole natural</h3>
            <img src="/img/productos/producto-natural.png" alt="" />
            <p>
              El tradicional, el que combina con todo, el de sabor inigualable,
              así es nuestro jolyguacamoly natural. Disfruta de su naturalidad y
              frescura🥑
            </p>
            <Link to="/productos">
              <button className="btn-joly">Ver</button>
            </Link>
          </article>

          <article className="card-inicio">
            <h3>guacamole natural</h3>
            <img src="/img/productos/producto-natural.png" alt="" />
            <p>
              El tradicional, el que combina con todo, el de sabor inigualable,
              así es nuestro jolyguacamoly natural. Disfruta de su naturalidad y
              frescura🥑
            </p>
            <Link to="/productos">
              <button className="btn-joly">Ver</button>
            </Link>
          </article>
        </section>

        <section className="beneficios">
          <h3>¿Por qué elegir JolyGuacamoly?</h3>
          <div className="beneficios-container">
            <div className="beneficio">
              <span>🌿</span>
              <h4>Ingredientes Naturales</h4>
              <p>Solo usamos aguacates y garbanzos de la mejor calidad.</p>
            </div>
            <div className="beneficio">
              <span>🚚</span>
              <h4>Entrega Rápida</h4>
              <p>Recibe tu pedido en tiempo récord con empaques seguros.</p>
            </div>
            <div className="beneficio">
              <span>💚</span>
              <h4>Hecho con Amor</h4>
              <p>Cada porción está pensada para sorprender a tu paladar.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
