import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./recetas.css";

function RecetasDestacadas() {
  const recetas = [
    {
      id: 1,
      nombre: "Sandwich de Guacamole Natural",
      tiempo: "15 min",
      dificultad: "Fácil",
      ingredientes: [
        "1 pote de JolyDips Natural",
        "2 Tajadas de pan",
        "1 pepino",
        "1/2 taza de cilantro",
        "1 limón",
      ],
      imagen: "/img/galeria/7.png",
      destacada: true,
    },
    {
      id: 2,
      nombre: "Nachos con guacamole",
      tiempo: "5 min",
      dificultad: "Fácil",
      ingredientes: [
        "1 pote de JolyDips Natural",
        "1 paquete de nachos",
        "Limon al gusto",
        "1 aguacate fresco",
        "Verduras al gusto",
      ],
      imagen: "/img/galeria/6.png",
    },
    {
      id: 3,
      nombre: "Guacamole con Tomate",
      tiempo: "10 min",
      dificultad: "Fácil",
      ingredientes: [
        "1 pote de JolyDips Natural",
        "4 tomates",
        "Limon al gusto",
      ],
      imagen: "/img/galeria/2.png",
      destacada: true,
    },
  ];

  return (
    <>
    <Header />
      <section className="recetas-joly">
        <div className="recetas-header">
          <h2>
            Recetas con <span className="marca-joly">JolyDips</span>
          </h2>
          <p className="subtitulo-recetas">
            Inspírate y sorprende a tus invitados
          </p>
          <div className="separador-aguacate"></div>
        </div>

        <div className="grid-recetas">
          {recetas.map((receta) => (
            <article
              key={receta.id}
              className={`card-receta ${receta.destacada ? "destacada" : ""}`}
            >
              <div
                className="imagen-receta"
                style={{ backgroundImage: `url(${receta.imagen})` }}
              >
                <div className="badge-tiempo">
                  ⏱️ {receta.tiempo} | {receta.dificultad}
                </div>
                {receta.destacada && (
                  <div className="badge-destacada">✨ Chef's Pick</div>
                )}
              </div>

              <div className="cuerpo-receta">
                <h3>{receta.nombre}</h3>

                <div className="ingredientes">
                  <h4>Ingredientes:</h4>
                  <ul>
                    {receta.ingredientes.map((ingrediente, index) => (
                      <li key={index}>{ingrediente}</li>
                    ))}
                  </ul>
                </div>

                <Link to={`/recetas/${receta.id}`} className="btn-receta-joly">
                  Ver paso a paso
                  <span className="icono-aguacate">🥑</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-recetas">
          <Link to="/recetas" className="btn-todas-recetas">
            Ver todas las recetas →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default RecetasDestacadas;
