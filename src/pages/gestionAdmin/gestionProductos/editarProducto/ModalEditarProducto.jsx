import { useState, useEffect } from "react";
import { alertaConfirmacion, alertaError } from "../../../../helpers/funciones";
import "./ModalEditarProducto.css";

export default function ModalEditarProducto({
  producto,
  isOpen,
  onClose,
  onProductoActualizado,
}) {
  const [form, setForm] = useState({});
  const [tieneOferta, setTieneOferta] = useState(false);

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || 0, // precio con oferta
        precioOriginal: producto.precioOriginal || 0, // precio real
      });
      setTieneOferta(!!producto.oferta); // Convertimos a booleano por si acaso
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setTieneOferta((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actualizado = {
        id: producto.id,
        nombre: form.nombre,
        descripcion: form.descripcion,
        oferta: tieneOferta, // Aseguramos que se envíe el valor actual del checkbox
        precio: tieneOferta ? Number(form.precio) : Number(form.precioOriginal),
        precioOriginal: Number(form.precioOriginal),
        urlImg: producto.urlImg,
        categoria: producto.categoria,
        cantidad: producto.cantidad,
        activo: producto.activo,
        creadoPorUsuario: producto.creadoPorUsuario,
      };

      const res = await fetch(`http://localhost:8080/productos/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || "Error al actualizar producto");

      alertaConfirmacion("Éxito", "Se actualizó correctamente");
      onProductoActualizado(data);
      onClose();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alertaError("Error", "Error al actualizar el producto");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-editar">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <input
            type="number"
            name="precioOriginal"
            value={form.precioOriginal}
            onChange={handleChange}
            placeholder="Precio original"
            min="0"
            step="0.01"
            required
          />

          <div className="checkbox-oferta">
            <input
              type="checkbox"
              id="oferta"
              checked={tieneOferta}
              onChange={handleCheckbox}
            />
            <label htmlFor="oferta">¿Activar oferta?</label>
          </div>

          {tieneOferta && (
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio con oferta"
              min="0"
              step="0.01"
              required
            />
          )}

          <div className="acciones-modal">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
