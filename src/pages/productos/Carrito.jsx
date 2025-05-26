import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./carrito.css";

let apiProductos = "http://localhost:3001/productos";

export default function Carrito() {
  const navigate = useNavigate();
  const [idProductos, setIdProductos] = useState([]);
  const [carritoContado, setCarritoContado] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  // Obtener el carrito actual del localStorage
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

  // Cargar productos desde API
  useEffect(() => {
    fetch(apiProductos)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const itemsGuardados = JSON.parse(localStorage.getItem("carrito")) || [];
    setIdProductos(itemsGuardados);
  }, []);

  // Contar productos por ID
  useEffect(() => {
    const conteo = [];

    idProductos.forEach((item) => {
      const existente = conteo.find((p) => p.productoId === item.productoId);
      if (existente) {
        existente.cantidad += 1;
      } else {
        conteo.push({ ...item, cantidad: 1 });
      }
    });

    setCarritoContado(conteo);
  }, [idProductos]);

  // Combinar conteo con datos reales de productos
  useEffect(() => {
    const detalles = carritoContado.map((item) => {
      const productoInfo = productos.find((p) => p.id == item.productoId);
      return { ...productoInfo, cantidad: item.cantidad };
    });

    setProductosEnCarrito(detalles);
  }, [carritoContado, productos]);

  function restarProductoDelCarrito(id) {
    // Buscar el índice del primer producto con ese ID
    const index = carritoActual.findIndex((item) => item.productoId === id);

    if (index !== -1) {
      carritoActual.splice(index, 1); // Eliminar una ocurrencia
      localStorage.setItem("carrito", JSON.stringify(carritoActual));
      setIdProductos(carritoActual); // Actualiza el estado para recontar
    }
  }

  function sumarProductoDelCarrito(id) {
    // Obtener el carrito actual del localStorage
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar una unidad más del producto
    carritoActual.push({ productoId: id });

    // Guardar de nuevo en localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    // Actualizar el estado para recontar
    setIdProductos(carritoActual);
  }

  return (
    <section
      className="carrito-contenedor"
    >
      <FaArrowLeft
        onClick={() => navigate(-1)}
        className="flecha-regresar-carrito"
      />
      <h2>Tu Carrito</h2>

      <div className="lista-carrito">
        {productosEnCarrito.map((producto) => (
          <div className="producto-carrito" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <section className="contenedor-info">
              <section>
                <h4>{producto.nombre}</h4>
                <p>{producto.descripcion}</p>
                <p>
                  <strong>${producto.precio}</strong>
                </p>
              </section>
              <div className="contenedor-button">
                <button onClick={() => restarProductoDelCarrito(producto.id)}>
                  -
                </button>
                <p className="cantida-producto">{producto.cantidad}</p>
                <button onClick={() => sumarProductoDelCarrito(producto.id)}>
                  +
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>

      <div className="carrito-total">
        <h3>
          Total: $
          {productosEnCarrito.reduce(
            (total, item) => total + item.precio * item.cantidad,
            0
          )}
        </h3>
        <button className="btn-finalizar">Finalizar Compra</button>
      </div>
    </section>
  );
}
