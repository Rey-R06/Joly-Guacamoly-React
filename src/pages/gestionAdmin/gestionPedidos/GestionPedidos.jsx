import { useState, useEffect } from "react";
import ModalEditarEstado from "./editarEstado.jsx/ModalEditarEstado";
import { alertaConfirmacion, alertaError } from "../../../helpers/funciones";
import "./GestionPedidos.css";

let apiPedidos = "http://localhost:8080/pedidos";

export default function GestionPedidos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pedido, setPedidoSeleccionado] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch(apiPedidos)
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Error al cargar pedidos:", err));
  }, []);

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.nombreDelPedido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.direccionEntrega?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const guardarEstado = async (nuevoEstado) => {
    // Validamos y limpiamos el estado antes de enviarlo
    const estadoFinal = nuevoEstado?.toUpperCase()?.trim();
    console.log("🟡 Estado a enviar:", estadoFinal);

    if (!estadoFinal) {
      alertaError("Estado no válido");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/pedidos/${pedido.id}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: estadoFinal }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text(); // 🔍 evitar JSON parse en errores HTML/texto
        console.error("Respuesta del servidor (error):", errorText);
        throw new Error(errorText || "Error al actualizar el estado");
      }

      const pedidoActualizado = await res.json();

      setPedidos((prevPedidos) =>
        prevPedidos.map((p) =>
          p.id === pedidoActualizado.id ? pedidoActualizado : p
        )
      );

      alertaConfirmacion("Éxito", "Pedido actualizado exitosamente");
      cerrarModal();
    } catch (error) {
      console.error("🔴 Error al guardar estado:", error);
      alertaError(
        error.message || "No se pudo actualizar el estado del pedido."
      );
    }
  };

  const abrirModal = (pedido) => {
    console.log(pedido);
    setPedidoSeleccionado(pedido);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPedidoSeleccionado(null); // <- corregido aquí
  };

  return (
    <section className="lista-pedidos-admin">
      {/* Barra de búsqueda */}
      <div className="barra-busqueda-pedidos">
        <input
          type="text"
          placeholder="Buscar por cliente o dirección..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <section className="contenedor-pedidos">
        {pedidosFiltrados.map((pedido) => (
          <article className="card-pedido-admin" key={pedido.id}>
            <h3>Pedido #{pedido.id}</h3>
            <p className="direccion-pedido">
              Dirección: {pedido.direccionEntrega}
            </p>
            <p>Cliente: {pedido.nombreDelPedido}</p>
            <p>Email: {pedido.emailDelPedido}</p>
            <p>Teléfono: {pedido.telefonoDelPedido}</p>
            <p className="estado-pedido">Estado: {pedido.estado}</p>

            <button
              className="btn-editar-estado"
              onClick={() => abrirModal(pedido)}
            >
              Editar Estado
            </button>
          </article>
        ))}
      </section>
      {modalAbierto && (
        <ModalEditarEstado
          isOpen={modalAbierto}
          pedido={pedido}
          onClose={cerrarModal}
          onGuardar={guardarEstado}
        />
      )}
    </section>
  );
}
