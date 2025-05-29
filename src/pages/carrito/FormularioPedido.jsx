// ModalPedido.jsx
import { useState } from "react";
import "./formularioPedido.css";

export default function FormularioPedido({ isOpen, onClose, onConfirm }) {
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ direccion, metodoPago, telefono });
    onClose(); // cerrar modal
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

          <div className="modal-buttons">
            <button type="submit">Confirmar pedido</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
