import { useState } from "react";
import "./registroInvitado.css";

export default function RegistroInvitado({
  isOpen,
  datos,
  onClose,
  onRegister,
}) {
  const [contraseña, setContraseña] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>¿Te gustaría registrarte?</h2>
        <p>
          Ya tenemos tus datos de contacto. Solo necesitas crear un usuario y
          contraseña para que puedas consultar tu pedido y obtener promociones.
        </p>

        <form
          onSubmit={(e) => {
            console.log(datos);
            e.preventDefault();
            onRegister({
              nombre: datos.nombre,
              email: datos.email,
              telefono: datos.telefono,
              direccionEntrega: datos.direccionEntrega,
              registrado: true,
              contraseña,
            });
          }}
        >
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />

          <div className="modal-botones">
            <button type="submit">Registrarme</button>
            <button type="button" onClick={onClose}>
              No, gracias
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
