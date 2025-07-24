import { useState } from "react";
import { alertaConfirmacion, alertaError } from "../../../../helpers/funciones";
import "./ModalAgregarProducto.css";

export default function ModalAgregarProducto({ isOpen, onClose, onProductoAgregado }) {
  let usuarioSesion = JSON.parse(localStorage.getItem("usuario"));
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precioOriginal: 0,
    precio: 0,
    oferta: false,
    urlImg: "",
    cantidad: 1,
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProducto = {
      ...form,
      precio: form.oferta ? form.precio : form.precioOriginal,
      usuario: { id: usuarioSesion.id },
    };

    try {
      const res = await fetch("http://localhost:8080/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || "Error al crear producto");

      alertaConfirmacion("Éxito", "Producto creado correctamente");
      onProductoAgregado(data);
      onClose();
    } catch (error) {
      console.error("Error al crear:", error);
      alertaError("Error al crear el producto");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-editar">
        <h2>Agregar Producto</h2>
        <form className="form-agregar" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            className="form-agregar-input"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <label>Descripcion:</label>
          <textarea
            className="form-agregar-textarea"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <label>Categoria:</label>
          <input
            className="form-agregar-input"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            placeholder="Categoria"
            required
          />
          <label>Precio:</label>
          <input
            className="form-agregar-input"
            type="number"
            name="precioOriginal"
            value={form.precioOriginal}
            onChange={handleChange}
            placeholder="Precio Original"
            min="0"
            step="0.01"
            required
          />
          <input
            className="form-agregar-input"
            name="urlImg"
            value={form.urlImg}
            onChange={handleChange}
            placeholder="URL de la imagen"
            required
          />
          <label>Cantidad:</label>
          <input
            className="form-agregar-input"
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            min="1"
            required
          />
          <div className="form-agregar-acciones">
            <button className="form-agregar-btn guardar" type="submit">Guardar</button>
            <button className="form-agregar-btn cancelar" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
