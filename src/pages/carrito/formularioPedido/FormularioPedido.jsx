import { useState, useEffect } from "react";
import "./formularioPedido.css";
import { alertaError } from "../../../helpers/funciones";

export default function FormularioPedido({
  isOpen,
  onClose,
  onConfirm,
  apiUsuarios,
}) {
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const usuarioSesion = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (isOpen) {
      const savedDireccion = localStorage.getItem("ultimaDireccion");
      // cuando el modal se abre
      if (savedDireccion) setDireccion(savedDireccion);
      if (usuarioSesion?.telefono) setTelefono(usuarioSesion.telefono);
      if (usuarioSesion?.nombre) setNombre(usuarioSesion.nombre);
      if (usuarioSesion?.email) setEmail(usuarioSesion.email);
    }
  }, [isOpen]); // <--- solo depende de "isOpen"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  // Validación del teléfono (solo números, 7-15 dígitos)
  const telefonoRegex = /^\d{7,15}$/;
  if (!telefonoRegex.test(telefono)) {
    alertaError("El teléfono debe contener solo números y tener entre 7 y 15 dígitos.") 
    return;
    };

    // Validación básica
  if (
    !direccion.trim() ||
    !metodoPago.trim() ||
    !telefono.trim() ||
    !nombre.trim() ||
    !email.trim()
  ) {
    alertaError("Por favor completa todos los campos antes de confirmar el pedido.");
    return;
  }

    const datosPedido = {
      direccion,
      metodoPago,
      telefono,
      nombre,
      email,
    };

    // Guardar en localStorage:
    localStorage.setItem("ultimaDireccion", direccion);

    // ✅ Solo si hay usuario logueado y le falta dirección o teléfono
    if (
      usuarioSesion &&
      (!usuarioSesion.direccion || !usuarioSesion.telefono)
    ) {
      try {
        const res = await fetch(`${apiUsuarios}/${usuarioSesion.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            direccionEntrega: direccion,
            telefono: telefono,
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
          />

          <label>Método de pago:</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="Tarjeta">Tarjeta</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>

          <label>Teléfono de contacto:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <>
            <label>Correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>

          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

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
