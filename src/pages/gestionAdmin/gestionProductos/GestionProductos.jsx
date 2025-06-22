import { useState, useEffect } from "react";
let apiProductos = "http://localhost:8080/productos";
import "./GestionProductos.css";

export default function GestionProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(apiProductos)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <section className="lista-productos-admin">
      {productos.map((producto) => (
        <article className="item-producto-admin" key={producto.id}>
          <div className="producto-info-con-img">
            <img
              src={producto.urlImg}
              alt={producto.nombre}
              className="img-producto-lista"
            />
            <div className="info-producto-lista">
              <h3 className="titulo-producto-lista">{producto.nombre}</h3>
              <p className="descripcion-producto-lista">
                {producto.descripcion}
              </p>
              <p className="precio-producto-lista">${producto.precio}</p>
            </div>
          </div>

          <div className="botones-producto-lista">
            <button className="btn-editar">Editar</button>
            <button className="btn-eliminar">Desactivar</button>
          </div>
        </article>
      ))}

      <div className="contenedor-boton-agregar">
        <button className="btn-agregar-producto">
          + Agregar nuevo producto
        </button>
      </div>
    </section>
  );
}
