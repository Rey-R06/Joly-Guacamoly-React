import { useState, useEffect } from "react";
import "./ModalEditarProducto.css";

export default function ModalEditarProducto({
  producto,
  onClose,
  onGuardar,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    onGuardar({
      ...producto,
      ...formData,
    });
  };

  return (
    <div className="modal-editar-producto">
      <div className="modal-contenido">
        <h2>Editar Producto</h2>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />

        <div className="botones-modal">
          <button onClick={handleSubmit} className="btn-guardar">
            Guardar cambios
          </button>
          <button onClick={onClose} className="btn-cerrar">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
