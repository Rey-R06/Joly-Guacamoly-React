import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { alertaConfirmacion, alertaError } from "../../helpers/funciones";
import FormularioPedido from "./FormularioPedido";
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
  const usuarioSesion = JSON.parse(localStorage.getItem("usuario")) || [];

  //Para abrir el formulario del pedido
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className="carrito-contenedor">
      <FaArrowLeft
        onClick={() => navigate(-1)}
        className="flecha-regresar-carrito"
      />
      <h2>Tu Carrito</h2>

      <div className="lista-carrito">
        {productosEnCarrito.length === 0 ? (
          <div className="carrito-vacio">
            <FaShoppingCart size={100} color="#b6bb18ff" />
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          productosEnCarrito.map((producto) => (
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
          ))
        )}
      </div>

      <div className="carrito-total">
        <h3>
          Total: $
          {productosEnCarrito.reduce(
            (total, item) => total + item.precio * item.cantidad,
            0
          )}
        </h3>
        <button
          className="btn-finalizar"
          onClick={
            carritoActual.length > 0
              ? () => setIsModalOpen(true)
              : () => alertaError("necesitas tener al menos 1 producto")
          }
        >
          Hacer pedido
        </button>
        <FormularioPedido
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(datos) => {
            // Recolectar datos del carrito
            const productos = productosEnCarrito.map((item) => ({
              productoId: item.id,
              cantidad: item.cantidad,
              precioUnitario: item.precio,
            }));

            let pedido;
            if (usuarioSesion) {
              pedido = {
                clienteId: usuarioSesion.id,
                fecha: new Date().toISOString(),
                estado: "pendiente",
                total: productos.reduce(
                  (acc, item) => acc + item.cantidad * item.precioUnitario,
                  0
                ),
                metodoPago: datos.metodoPago,
                direccionEntrega: datos.direccion,
                items: productos,
              };
            } else {
              pedido = {
                clienteId: "usuari no registrado",
                fecha: new Date().toISOString(),
                estado: "pendiente",
                total: productos.reduce(
                  (acc, item) => acc + item.cantidad * item.precioUnitario,
                  0
                ),
                metodoPago: datos.metodoPago,
                direccionEntrega: datos.direccion,
                items: productos,
              };
            }

            fetch("http://localhost:3001/pedidos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(pedido),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Error al enviar pedido");
                return res.json();
              })
              .then((data) => {
                console.log("Pedido registrado:", data);
                localStorage.removeItem("carrito");
                // ✅ Actualizar historialPedidos del cliente dentro del then
                if (usuarioSesion?.id) {
                  const nuevosPedidos = [
                    ...(usuarioSesion.historialPedidos || []),
                    data.id,
                  ];

                  fetch(`http://localhost:3001/clientes/${usuarioSesion.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ historialPedidos: nuevosPedidos }),
                  })
                    .then((res) => {
                      if (!res.ok)
                        throw new Error(
                          "Error al actualizar historial de pedidos"
                        );
                      return res.json();
                    })
                    .then((clienteActualizado) => {
                      localStorage.setItem(
                        "usuario",
                        JSON.stringify(clienteActualizado)
                      );

                      alertaConfirmacion(
                        "Gracias por tu compra",
                        "Pedido realizado con éxito, esté pendiente del seguimiento"
                      ).then(() => {
                        navigate("/productos");
                      });
                    })
                    .catch((error) => {
                      console.error("Error actualizando cliente:", error);
                    });
                } else {
                  alertaError(
                    "Error al realizar el pedido"
                  ).then(() => {
                    navigate("/productos");
                  });
                }
              })
              .catch((error) => {
                console.error("Error al registrar pedido:", error);
              });

            console.log("Datos del pedido:", datos);
          }}
        />
      </div>
    </section>
  );
}
