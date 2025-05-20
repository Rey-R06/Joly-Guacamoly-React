import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Carrusel from "../../components/carrusel/Carrusel";
import Galeria from "./Galeria";
import { Link } from "react-router-dom";
import "./inicio.css";

export default function Inicio() {
  return (
    <>
      <Header />
      <main>
        <Carrusel />

        <section className="sobre-nosotros-moderno">
          <div className="contenedor-izquierdo">
            <div className="tarjeta-texto">
              <h2 className="titulo-destacado">
                <span className="texto-aguacate">Joly</span>Dips
              </h2>
              <p className="subtitulo-minimalista">
                GUACAMOLE ARTESANAL MEDELLINENSE
              </p>

              <div className="linea-aguacate"></div>

              <p className="descripcion-elegante">
                Desde el corazón de El Poblado, Medellín, elaboramos dips de
                aguacate 100% naturales, sin conservantes ni aditivos. Cada
                fruto es seleccionado a mano para garantizar auténtico sabor
                campesino.
              </p>

              <Link to="/joly" className="boton-minimalista">
                <span className="icono-aguacate">🥑</span>
                <span>Conócenos</span>
                <span className="flecha">→</span>
              </Link>
            </div>
          </div>

          <div className="contenedor-derecho">
            <div className="marco-imagen">
              <img
                src="/Fundadores.jpg"
                alt="Equipo JolyDips en Medellín"
                className="imagen-fundadores"
              />
              <div className="sello-calidad">
                <span>100% Natural</span>
              </div>
            </div>
          </div>
        </section>

        <Galeria />

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
