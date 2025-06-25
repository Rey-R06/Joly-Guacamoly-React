import { useState, useEffect } from "react";
import "./ModalEditarEstado.css";

export default function ModalEditarEstado({ isOpen, pedido, onClose, onGuardar }) {
  const [nuevoEstado, setNuevoEstado] = useState(pedido.estado);

  // Cuando abres el modal, sincroniza el estado
  useEffect(() => {
    if (pedido?.estado) {
      setNuevoEstado(pedido.estado);
    }
  }, [pedido]);

  if (!isOpen) return null;

  return (
    <div className="overlay-modal-estado">
      <div className="modal-estado">
        <h2>Editar Estado del Pedido #{pedido.id}</h2>
        <select
          value={nuevoEstado}
          onChange={(e) => setNuevoEstado(e.target.value)}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="PREPARANDO">Preparando</option>
          <option value="ENVIADO">Enviado</option>
          <option value="ENTREGADO">Entregado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>

        <div className="modal-estado-botones">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => onGuardar(nuevoEstado)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
