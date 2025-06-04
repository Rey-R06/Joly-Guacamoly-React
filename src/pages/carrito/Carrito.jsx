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

const apiPedidos = "https://683fbfa85b39a8039a558922.mockapi.io/pedidos";
const apiClientes = "https://683fac3a5b39a8039a5546ae.mockapi.io/clientes";
const apiProductos = "https://683fac3a5b39a8039a5546ae.mockapi.io/productos";

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

  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  const usuarioSesion = JSON.parse(localStorage.getItem("usuario")) || {};

  // Cargar productos
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

  // Cargar carrito
  useEffect(() => {
    const itemsGuardados = JSON.parse(localStorage.getItem("carrito")) || [];
    setIdProductos(itemsGuardados);
  }, []);

  // Contar productos
  useEffect(() => {
    const conteo = idProductos.reduce((acc, item) => {
      const existente = acc.find(p => p.productoId === item.productoId);
      existente ? existente.cantidad++ : acc.push({ ...item, cantidad: 1 });
      return acc;
    }, []);
    setCarritoContado(conteo);
  }, [idProductos]);

  // Combinar datos
  useEffect(() => {
    const detalles = carritoContado
      .map(item => ({
        ...productos.find(p => p.id === item.productoId),
        cantidad: item.cantidad
      }))
      .filter(Boolean);
    setProductosEnCarrito(detalles);
  }, [carritoContado, productos]);

  const restarProductoDelCarrito = (id) => {
    const nuevoCarrito = carritoActual.filter(item => item.productoId !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setIdProductos(nuevoCarrito);
  };

  const sumarProductoDelCarrito = (id) => {
    const nuevoCarrito = [...carritoActual, { productoId: String(id) }];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setIdProductos(nuevoCarrito);
  };

  const crearPedido = async (datos) => {
    if (productosEnCarrito.length === 0) {
      alertaError("El carrito está vacío");
      return;
    }

    const itemsPedido = productosEnCarrito.map(item => ({
      productoId: String(item.id),
      cantidad: item.cantidad,
      precioUnitario: item.precio
    }));

    const pedido = {
      clienteId: usuarioSesion?.id || null,
      registrado: !!usuarioSesion?.id,
      fecha: new Date().toISOString(),
      estado: "pendiente",
      total: itemsPedido.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0),
      metodoPago: datos.metodoPago,
      direccionEntrega: datos.direccion,
      items: itemsPedido,
      ...(!usuarioSesion?.id && {
        nombreDelPedido: datos.nombre,
        emailDelPedido: datos.email,
        telefonoDelPedido: datos.telefono
      })
    };

    try {
      const res = await fetch(apiPedidos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });
      
      if (!res.ok) throw new Error("Error al crear pedido");
      
      const pedidoCreado = await res.json();
      
      if (usuarioSesion?.id) {
        await actualizarHistorialUsuario(usuarioSesion.id, pedidoCreado.id);
        alertaConfirmacion(
          "Gracias por tu compra",
          "Pedido realizado con éxito"
        ).then(() => navigate("/productos"));
      } else {
        setDatosInvitado({
          nombre: datos.nombre,
          email: datos.email,
          telefono: datos.telefono
        });
        setUltimoPedidoId(pedidoCreado.id);
        setModalRegistroOpen(true);
      }
      
      localStorage.removeItem("carrito");
    } catch (error) {
      console.error("Error:", error);
      alertaError("Error al procesar el pedido");
    }
  };

  const actualizarHistorialUsuario = async (userId, pedidoId) => {
    try {
      const res = await fetch(`${apiClientes}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          historialPedidos: [...(usuarioSesion.historialPedidos || []), pedidoId]
        })
      });
      
      if (!res.ok) throw new Error("Error al actualizar usuario");
      
      const usuarioActualizado = await res.json();
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const registrarInvitado = async (nuevoUsuario) => {
    try {
      // Registrar usuario
      const resUsuario = await fetch(apiClientes, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoUsuario,
          historialPedidos: ultimoPedidoId ? [ultimoPedidoId] : []
        })
      });
      
      if (!resUsuario.ok) throw new Error("Error al registrar usuario");
      
      const usuarioRegistrado = await resUsuario.json();
      
      // Actualizar pedido con el nuevo ID de cliente
      await fetch(`${apiPedidos}/${ultimoPedidoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId: usuarioRegistrado.id,
          registrado: true
        })
      });
      
      // Guardar sesión
      localStorage.setItem("token", generarToken());
      localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));
      
      alertaConfirmacion(
        "¡Registro exitoso!",
        "Ahora puedes consultar tus pedidos"
      ).then(() => navigate("/productos"));
    } catch (error) {
      console.error("Error:", error);
      alertaError("Hubo un problema al registrar");
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
              <img src={producto.imagen} alt={producto.nombre} />
              <section className="contenedor-info">
                <section>
                  <h4>{producto.nombre}</h4>
                  <p>{producto.descripcion}</p>
                  <p><strong>${producto.precio}</strong></p>
                </section>
                <div className="contenedor-button">
                  <button onClick={() => restarProductoDelCarrito(producto.id)}>-</button>
                  <p className="cantida-producto">{producto.cantidad}</p>
                  <button onClick={() => sumarProductoDelCarrito(producto.id)}>+</button>
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
          disabled={productosEnCarrito.length === 0}
          onClick={() => setIsModalOpen(true)}
        >
          Hacer pedido
        </button>
      </div>

      <FormularioPedido
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
      />
    </section>
  );
}