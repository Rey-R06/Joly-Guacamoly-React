import "./card.css";

export default function CardProductos({ producto }) {
  function añadirAlCarrito() {
    // Obtener carrito actual o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar el producto (puedes evitar duplicados si lo deseas)
    carrito.push({ productoId: producto.id });

    // Guardar carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  return (
    <article className="card-producto">
      <div className="producto-img-container">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
        {producto.oferta && <span className="badge-oferta">OFERTA</span>}
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="producto-desc">{producto.descripcion}</p>
        <div className="producto-precio">
          {producto.precioOriginal && (
            <span className="precio-original">
              ${producto.precioOriginal.toLocaleString()}
            </span>
          )}
          <span className="precio-actual">
            ${producto.precio.toLocaleString()}
          </span>
        </div>
        <button className="btn-agregar" onClick={añadirAlCarrito}>
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}
