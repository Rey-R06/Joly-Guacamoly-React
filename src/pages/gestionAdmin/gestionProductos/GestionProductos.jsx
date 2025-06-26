import { useState, useEffect } from "react";
import { alertaConfirmacion, alertaError } from "../../../helpers/funciones";
import ModalEditarProducto from "./editarProducto/ModalEditarProducto";
import ModalAgregarProducto from "./agregarProducto/ModalAgregarProducto";
import "./GestionProductos.css";

const apiProductos = "http://localhost:8080/productos";

export default function GestionProductos() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [productos, setProductos] = useState([]);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  const abrirAgregarModal = () => {
    setModalAgregarAbierto(true);
  };

  const cerrarAgregarModal = () => {
    setModalAgregarAbierto(false);
  };

  const agregarProductoALista = (nuevoProducto) => {
  setProductos((prev) => [...prev, nuevoProducto]);
};

  const actualizarProductoEnLista = (productoActualizado) => {
    const actualizados = productos.map((p) =>
      p.id === productoActualizado.id ? productoActualizado : p
    );
    setProductos(actualizados);
  };

  const activarYDesactivarProducto = async (id, accion) => {
    try {
      const res = await fetch(
        `http://localhost:8080/productos/${id}/${accion}`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) throw new Error("Error al cambiar estado del producto");

      alertaConfirmacion(
        "Éxito",
        `Producto ${
          accion === "activar" ? "activado" : "desactivado"
        } correctamente.`
      );

      setProductos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, activo: accion === "activar" } : p
        )
      );
    } catch (err) {
      console.error(err);
      alertaError("No se pudo actualizar el estado del producto");
    }
  };

  useEffect(() => {
    fetch(apiProductos)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <>
      <section className="lista-productos-admin">
        {productos.map((producto) => (
          <article
            key={producto.id}
            className={`item-producto-admin ${
              !producto.activo ? "producto-desactivado" : ""
            }`}
          >
            <div className="producto-info-con-img">
              <img
                src={producto.urlImg}
                alt={producto.nombre}
                className="img-producto-lista"
              />
              <div className="info-producto-lista">
                <h3 className="titulo-producto-lista">{producto.nombre}</h3>
                <p className="descripcion-producto-lista">
                  {producto.descripcion}
                </p>
                <p className="precio-producto-lista">${producto.precio}</p>
              </div>
            </div>

            <div className="botones-producto-lista">
              <button
                className="btn-editar"
                onClick={() => abrirModal(producto)}
              >
                Editar
              </button>
              <button
                className="btn-activar-desactivar"
                onClick={() =>
                  activarYDesactivarProducto(
                    producto.id,
                    producto.activo ? "desactivar" : "activar"
                  )
                }
              >
                {producto.activo ? "Desactivar" : "Activar"}
              </button>
            </div>
          </article>
        ))}

        <div className="contenedor-boton-agregar">
          <button
            className="btn-agregar-producto"
            onClick={() => abrirAgregarModal()}
          >
            + Agregar nuevo producto
          </button>
        </div>
      </section>

      {modalAbierto && (
        <ModalEditarProducto
          isOpen={modalAbierto}
          producto={productoSeleccionado}
          onClose={cerrarModal}
          onProductoActualizado={actualizarProductoEnLista}
        />
      )}

      {modalAgregarAbierto && (
        <ModalAgregarProducto
          isOpen={modalAgregarAbierto}
          onClose={cerrarAgregarModal}
          onProductoAgregado={agregarProductoALista}
        />
      )}
    </>
  );
}
