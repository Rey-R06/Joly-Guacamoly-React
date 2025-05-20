import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./joly.css";

export default function Joly() {
  return (
    <>
    <Header />
    <section className="sobre-nosotros">
  <div className="sobre-nosotros-content">
    <h2>Somos <span>JolyDips</span></h2>

    <div className="story">
      <img src="/Fundadores.jpg" alt="Fundadores de JolyDips" className="img-fundadores" />
      <p>
        JolyDips nació en Medellín tras una experiencia en Australia en un restaurante mexicano.
        Camilo Jaramillo, quien al principio no disfrutaba del guacamole, creó una receta artesanal
        que se convirtió en favorita en reuniones familiares. Así nació nuestra marca natural y sin conservantes.
      </p>
    </div>

    <div className="mision-vision">
      <div className="mision">
        <h3>Nuestra Misión</h3>
        <p>
          Inspirado por experiencias vividas y apoyado por amigos, trabajo arduamente para llegar
          a los hogares dando a conocer el increíble sabor de mis productos naturales.
        </p>
      </div>
      <div className="vision">
        <h3>Nuestra Visión</h3>
        <p>
          Lograr un posicionamiento significativo en el mercado y destacar frente a otras empresas.
        </p>
      </div>
    </div>

    <div className="galeria-nosotros">
      <img src="/img/galeria/10.png" alt="Imagen galería 1" />
      <img src="/img/galeria/11.png" alt="Imagen galería 2" />
      <img src="/img/galeria/12.png" alt="Imagen galería 3" />
      <img src="/img/galeria/13.png" alt="Imagen galería 4" />
    </div>
  </div>
</section>
<Footer />
    
    </>
  )
}
