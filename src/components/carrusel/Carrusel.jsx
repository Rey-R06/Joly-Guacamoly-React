import { Carousel } from "react-bootstrap";
import "./carrusel.css";

import "bootstrap/dist/css/bootstrap.min.css";

function Carrusel() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh", // 70% del alto de pantalla
        minHeight: "500px", // Mínimo para móviles
        maxHeight: "900px", // Máximo para pantallas grandes
        overflow: "hidden",
      }}
    >
      <Carousel interval={3000} pause="hover">
        {[
          { img: 1, text: "Para un paladar exquisito" },
          { img: 2, text: "No somos una salsa" },
          { img: 3, text: "Cremoso, cuchareable y con trocitos de aguacate" },
        ].map((item, index) => (
          <Carousel.Item key={index} style={{ height: "100vh" }}>
            <div
              className="d-flex flex-column justify-content-center align-items-center text-white"
              style={{
                height: "100%",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/img/galeria/${item.img}.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h2
                className="display-1 fw-bold mb-3"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                }}
              >
                JolyDips
              </h2>
              <p
                className="lead mb-4 fs-3"
                style={{
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                  maxWidth: "80%",
                  textAlign: "center",
                }}
              >
                {item.text}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrusel;
