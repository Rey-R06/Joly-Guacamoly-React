import { useState, useEffect } from "react";
import "./formularioPedido.css";

export default function FormularioPedido({ isOpen, onClose, onConfirm }) {
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const usuarioSesion = JSON.parse(localStorage.getItem("usuario"));
  const esUsuarioInvitado = !usuarioSesion;
  const necesitaDireccionTelefono =
    !usuarioSesion?.direccion || !usuarioSesion?.telefono;

  useEffect(() => {
    if (usuarioSesion) {
      if (usuarioSesion.direccion) setDireccion(usuarioSesion.direccion);
      if (usuarioSesion.telefono) setTelefono(usuarioSesion.telefono);
      if (usuarioSesion.nombre) setNombre(usuarioSesion.nombre);
      if (usuarioSesion.email) setEmail(usuarioSesion.email);
    }
  }, [usuarioSesion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosPedido = {
      direccion,
      metodoPago,
      telefono,
      nombre: nombre || usuarioSesion?.nombre,
      email: email || usuarioSesion?.email,
    };

    // ✅ Solo si hay usuario logueado y le falta dirección o teléfono
    if (usuarioSesion && (!usuarioSesion.direccion || !usuarioSesion.telefono)) {
      try {
        const res = await fetch(`http://localhost:3001/clientes/${usuarioSesion.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            direccion,
            telefono,
          }),
        });

        if (!res.ok) throw new Error("Error al actualizar datos del cliente");

        const updatedUser = await res.json();
        localStorage.setItem("usuario", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Error actualizando cliente:", error);
      }
    }

    onConfirm(datosPedido);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-titulo">Completar pedido</h2>
        <form onSubmit={handleSubmit}>
          <label>Dirección de entrega:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />

          <label>Método de pago:</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="tarjeta">Tarjeta</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>

          <label>Teléfono de contacto:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          {(esUsuarioInvitado || necesitaDireccionTelefono) && (
            <>
              {!usuarioSesion?.nombre && (
                <>
                  <label>Nombre completo:</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </>
              )}

              {!usuarioSesion?.email && (
                <>
                  <label>Correo electrónico:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </>
              )}
            </>
          )}

          <div className="modal-buttons">
            <button type="submit">Confirmar pedido</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
