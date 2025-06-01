import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import {
  alertaConfirmacion,
  alertaError,
  generarToken,
} from "../../helpers/funciones";
import FormularioPedido from "./formularioPedido/FormularioPedido";
import RegistroInvitado from "./formularioPedido/registroInvitado/RegistroInvitado";
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

  //Registro clientes despues de hacer un pedido
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [datosInvitado, setDatosInvitado] = useState({});
  const [ultimoPedidoId, setUltimoPedidoId] = useState(null);

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

            //Crea el pedido
            let pedido;
            if (
              usuarioSesion &&
              typeof usuarioSesion === "object" &&
              usuarioSesion.id
            ) {
              // Usuarios registrados
              pedido = {
                clienteId: usuarioSesion.id,
                registrado: true,
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
              // Usuarios invitados
              pedido = {
                clienteId: null,
                registrado: false,
                fecha: new Date().toISOString(),
                estado: "pendiente",
                total: productos.reduce(
                  (acc, item) => acc + item.cantidad * item.precioUnitario,
                  0
                ),
                metodoPago: datos.metodoPago,
                direccionEntrega: datos.direccion,
                items: productos,
                nombreDelPedido: datos.nombre,
                emailDelPedido: datos.email,
                telefonoDelPedido: datos.telefono,
              };
            }

            //Guarda el pedido
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
                // ✅ Actualiza el historialPedidos para que le aparezca al cliente en su home
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
                  setDatosInvitado({
                    nombre: datos.nombre,
                    email: datos.email,
                    telefono: datos.telefono,
                  });
                  setUltimoPedidoId(data.id); // 👈 Guarda el ID del pedido
                  setModalRegistroOpen(true); // Abre modal para ofrecer registro
                }
              })
              .catch((error) => {
                console.error("Error al registrar pedido:", error);
              });

            console.log("Datos del pedido:", datos);
          }}
        />
        <RegistroInvitado
          isOpen={modalRegistroOpen}
          datos={datosInvitado}
          onClose={() => {
            alertaConfirmacion(
              "Pedido realizado",
              "Gracias por tu pedido. Te mantendremos al tanto por WhatsApp o Gmail."
            );
            setModalRegistroOpen(false);
            navigate("/productos");
          }}
          onRegister={(nuevoUsuario) => {
            fetch("http://localhost:3001/clientes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...nuevoUsuario,
                historialPedidos: ultimoPedidoId ? [ultimoPedidoId] : [], // ✅ Asocia el pedido
              }),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Error al registrar usuario");
                return res.json();
              })
              .then((usuarioRegistrado) => {
                // 1. Obtener el pedido actual
                fetch(`http://localhost:3001/pedidos/${ultimoPedidoId}`)
                  .then((response) => response.json())
                  .then((pedidoExistente) => {
                    // 2. Actualizar solo el campo deseado
                    const pedidoActualizado = {
                      ...pedidoExistente, // Conserva todos los campos originales
                      clienteId: usuarioRegistrado.id,
                      registrado: true, // Sobrescribe este campo
                    };

                    // 3. Enviar la actualización
                    return fetch(
                      `http://localhost:3001/pedidos/${ultimoPedidoId}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(pedidoActualizado),
                      }
                    );
                  })
                  .then((response) => {
                    if (!response.ok) throw new Error("Error al actualizar");
                    return response.json();
                  })
                  .then((data) => {
                    console.log("Pedido actualizado:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });

                console.log(usuarioRegistrado);
                let tokenAcceso = generarToken();
                localStorage.setItem("token", tokenAcceso);
                localStorage.setItem(
                  "usuario",
                  JSON.stringify(usuarioRegistrado)
                );
                alertaConfirmacion(
                  "¡Registro exitoso!",
                  "Ahora puedes consultar tus pedidos desde tu cuenta."
                ).then(() => {
                  navigate("/productos");
                });
              })
              .catch((err) => {
                console.error("Error al registrar usuario:", err);
                alertaError("Hubo un problema al registrar el usuario");
              });
          }}
        />
      </div>
    </section>
  );
}
