import { useState, useEffect } from "react";
import "./GestionPedidos.css";

let apiPedidos = "http://localhost:8080/pedidos";

export default function GestionPedidos() {
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
              onClick={() =>
                console.log(`Editar estado del pedido ${pedido.id}`)
              }
            >
              Editar Estado
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}
