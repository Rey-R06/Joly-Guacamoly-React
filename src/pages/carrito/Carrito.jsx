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

const apiPedidos = "https://product-manager-api-production-79d2.up.railway.app/pedidos";
const apiUsuarios = "https://product-manager-api-production-79d2.up.railway.app/usuarios";
const apiProductos = "https://product-manager-api-production-79d2.up.railway.app/productos";

export default function Carrito() {
  const navigate = useNavigate();
  const [idProductos, setIdProductos] = useState([]);
  const [carritoContado, setCarritoContado] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [datosInvitado, setDatosInvitado] = useState({});
  const [ultimoPedidoId, setUltimoPedidoId] = useState(null);
  const [isSendingPedido, setIsSendingPedido] = useState(false);
  const [isRegisteringInvitado, setIsRegisteringInvitado] = useState(false);

  const usuarioSesion = JSON.parse(localStorage.getItem("usuario")) || {};

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch(apiProductos);
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error:", err);
        alertaError("No se pudieron cargar los productos");
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    const itemsGuardados = JSON.parse(localStorage.getItem("carrito")) || [];
    setIdProductos(itemsGuardados);
  }, []);

  useEffect(() => {
    const conteo = idProductos.reduce((acc, item) => {
      const existente = acc.find((p) => p.productoId === item.productoId);
      existente ? existente.cantidad++ : acc.push({ ...item, cantidad: 1 });
      return acc;
    }, []);
    setCarritoContado(conteo);
  }, [idProductos]);

  useEffect(() => {
    const detalles = carritoContado
      .map((item) => ({
        ...productos.find((p) => p.id === item.productoId),
        cantidad: item.cantidad,
      }))
      .filter(Boolean);
    setProductosEnCarrito(detalles);
  }, [carritoContado, productos]);

  const restarProductoDelCarrito = (id) => {
    const nuevoCarrito = [...idProductos];
    const index = nuevoCarrito.findIndex((item) => item.productoId === id);
    if (index !== -1) nuevoCarrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setIdProductos(nuevoCarrito);
  };

  const sumarProductoDelCarrito = (id) => {
    const nuevoCarrito = [...idProductos, { productoId: id }];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setIdProductos(nuevoCarrito);
  };

  const crearPedido = async (datos) => {
    if (productosEnCarrito.length === 0) {
      alertaError("El carrito está vacío");
      return;
    }

    if (!datos.direccion || !datos.metodoPago) {
      alertaError("Completa la dirección y método de pago");
      return;
    }

    const pedido = {
      direccionEntrega: datos.direccion,
      metodoDePago: datos.metodoPago,
      estado: "PENDIENTE",
      itemsPedido: productosEnCarrito.map((item) => ({
        producto: { id: item.id },
        cantidad: item.cantidad,
      })),
      ...(usuarioSesion?.id
        ? { usuario: { id: usuarioSesion.id } }
        : {
            nombreDelPedido: datos.nombre,
            emailDelPedido: datos.email,
            telefonoDelPedido: datos.telefono,
          }),
      nombreDelPedido: datos.nombre,
      emailDelPedido: datos.email,
      telefonoDelPedido: datos.telefono,
    };

    try {
      setIsSendingPedido(true);
      const res = await fetch(apiPedidos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensaje || "Error al crear pedido");

      const pedidoCreado = data; // ✅ pedido ya creado con ID

      if (usuarioSesion?.id) {
        // ✅ Ahora sí, actualizar historial después de tener el ID del pedido
        await fetch(
          `${apiUsuarios}/${usuarioSesion.id}/agregar-pedido`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pedidoId: pedidoCreado.id }),
          }
        );

        // ✅ Actualizar también localStorage
        usuarioSesion.historialPedidos = [
          ...(usuarioSesion.historialPedidos || []),
          pedidoCreado.id,
        ];
        localStorage.setItem("usuario", JSON.stringify(usuarioSesion));

        alertaConfirmacion(
          "Gracias por tu compra",
          "Pedido realizado con éxito"
        ).then(() => navigate("/productos"));
      } else {
        // 🛠️ Lógica para invitado
        setDatosInvitado({
          direccionEntrega: datos.direccion,
          nombre: datos.nombre,
          email: datos.email,
          telefono: datos.telefono,
        });
        setUltimoPedidoId(pedidoCreado.id);
        setModalRegistroOpen(true);
      }

      localStorage.removeItem("carrito"); // 🛒 limpiar carrito
    } catch (error) {
      console.error("Error:", error);
      alertaError("Error al procesar el pedido");
    } finally {
      setIsSendingPedido(false);
    }
  };

  const registrarInvitado = async (nuevoUsuario) => {
    try {
      setIsRegisteringInvitado(true);
      console.log("usuario", nuevoUsuario);
      const resUsuario = await fetch(apiUsuarios, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoUsuario,
          rol: "Cliente",
          historialPedidos: ultimoPedidoId ? [ultimoPedidoId] : [],
          registrado: true,
        }),
      });

      if (!resUsuario.ok) throw new Error("Error al registrar usuario");

      const usuarioRegistrado = await resUsuario.json();

      await fetch(`${apiPedidos}/${ultimoPedidoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: { id: usuarioRegistrado.id },
        }),
      });

      localStorage.setItem("token", generarToken());
      localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));

      alertaConfirmacion(
        "¡Registro exitoso!",
        "Ahora puedes consultar tus pedidos"
      ).then(() => navigate("/productos"));
    } catch (error) {
      console.error("Error:", error);
      alertaError("Hubo un problema al registrar");
    } finally {
      setIsRegisteringInvitado(false);
    }
  };

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
              <img src={producto.urlImg} alt={producto.nombre} />
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
          disabled={productosEnCarrito.length === 0 || isSendingPedido}
          onClick={() => setIsModalOpen(true)}
        >
          {isSendingPedido ? "Procesando pedido..." : "Hacer pedido"}
        </button>
      </div>

      <FormularioPedido
        apiUsuarios={apiUsuarios}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={crearPedido}
      />

      <RegistroInvitado
        isOpen={modalRegistroOpen}
        datos={datosInvitado}
        onClose={() => {
          alertaConfirmacion(
            "Pedido realizado",
            "Gracias por tu compra, si ya tiene cuenta mire el progreso de su pedido aqui mismo si no le estaremos avisando por whatsapp o gmail"
          ).then(() => navigate("/productos"));
          setModalRegistroOpen(false);
        }}
        onRegister={registrarInvitado}
        isSubmitting={isRegisteringInvitado}
      />
    </section>
  );
}
