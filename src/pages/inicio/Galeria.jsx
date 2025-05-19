import './galeria.css';

function Galeria() {
  const productos = [
    { id: 1, imagen: "/img/galeria/4.png", nombre: "Clásico Tradicional" },
    { id: 2, imagen: "/img/galeria/5.png", nombre: "Picante Especial" },
    { id: 3, imagen: "/img/galeria/6.png", nombre: "Hierbas Frescas" },
    { id: 4, imagen: "/img/galeria/7.png", nombre: "Familiar" },
    { id: 5, imagen: "/img/galeria/8.png", nombre: "Combo Fiesta" },
    { id: 6, imagen: "/img/galeria/9.png", nombre: "Edición Premium" },
    { id: 7, imagen: "/img/galeria/10.png", nombre: "Combo Pareja" },
    { id: 8, imagen: "/img/galeria/11.png", nombre: "Limitada Otoño" }
  ];

  return (
    <section className="galeria-joly">
      <div className="encabezado-joly">
        <h2>Explora Nuestra <span className="destacado-joly">Variedad</span></h2>
        <p className="subtitulo-joly">Cada combinación, una experiencia única de sabor</p>
        <div className="separador-joly"></div>
      </div>

      <div className="masonry-joly">
        {productos.map((producto) => (
          <div 
            key={producto.id}
            className="item-joly"
            style={{ backgroundImage: `url(${producto.imagen})` }}
          >
            <div className="overlay-joly">
              <h3>{producto.nombre}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Galeria;