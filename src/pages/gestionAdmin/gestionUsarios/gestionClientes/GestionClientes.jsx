import { useState, useEffect } from "react";
let apiUsuarios = "https://product-manager-api-production-79d2.up.railway.app/usuarios";
import "../adminsYClientes.css";

export default function GestionClientes() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch(apiUsuarios)
      .then((res) => res.json())
      .then((data) => {
        const clientes = data.filter((usuario) => usuario.rol === "Cliente");
        setUsuarios(clientes);
      })
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  const clientesFiltrados = usuarios.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="lista-clientes-admin">
      {/* Barra de búsqueda */}
      <div className="barra-busqueda-clientes">
        <input
          type="text"
          placeholder="Buscar cliente por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      {/* Lista de clientes */}
      <section className="contenedor-card">
        {clientesFiltrados.map((cliente) => (
          <article key={cliente.id} className="card-cliente-admin">
            <h3 className="nombre-cliente">{cliente.nombre}</h3>
            <p className="email-cliente">{cliente.email}</p>
            <p className="telefono-cliente">{cliente.telefono}</p>
          </article>
        ))}
      </section>

      {clientesFiltrados.length === 0 && (
        <p className="no-resultados">No se encontraron resultados.</p>
      )}
    </section>
  );
}
