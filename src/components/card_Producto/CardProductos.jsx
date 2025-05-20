import "./card.css";

export default function CardProductos({ producto}) {
  return (
    <article className="card-producto">
      <div className="producto-img-container">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          loading="lazy"
        />
        {producto.oferta && <span className="badge-oferta">OFERTA</span>}
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="producto-desc">{producto.descripcion}</p>
        <div className="producto-precio">
          {producto.precioOriginal && (
            <span className="precio-original">${producto.precioOriginal.toLocaleString()}</span>
          )}
          <span className="precio-actual">${producto.precio.toLocaleString()}</span>
        </div>
        <button className="btn-agregar">Añadir al carrito</button>
      </div>
    </article>
  );
}
