import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./recetas.css";

function RecetasDestacadas() {
  const recetas = [
    {
      id: 1,
      nombre: "Tostadas de Guacamole Picante",
      tiempo: "15 min",
      dificultad: "Fácil",
      ingredientes: [
        "1 pote de JolyDips Picante",
        "8 tostadas de maíz",
        "100g de queso fresco",
        "1/2 taza de cilantro",
        "1 limón",
      ],
      imagen: "/img/recetas/tostadas.jpg",
      destacada: true,
    },
    {
      id: 2,
      nombre: "Burritos Vegetarianos",
      tiempo: "25 min",
      dificultad: "Media",
      ingredientes: [
        "1 pote de JolyDips Natural",
        "4 tortillas de trigo",
        "1 taza de frijoles",
        "1 aguacate fresco",
        "Verduras al gusto",
      ],
      imagen: "/img/recetas/burritos.jpg",
    },
    {
      id: 3,
      nombre: "Nachos Supreme",
      tiempo: "20 min",
      dificultad: "Fácil",
      ingredientes: [
        "1 pote de JolyDips Clásico",
        "200g de nachos",
        "1 taza de carne molida",
        "Pico de gallo",
        "Crema agria",
      ],
      imagen: "/img/recetas/nachos.jpg",
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
