import "./pedidoCard.css"

export default function PedidoCard({ pedido, productosDb }) {
  return (
    <div className="pedido-card">
      <h3>Pedido: {pedido.estado.replace("_", " ")}</h3>
      <p>Dirección: {pedido.direccionEntrega}</p>
      <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
      <p>Total: ${pedido.total}</p>
      <p>Método de pago: {pedido.metodoPago}</p>
      <div className="productos-pedido">
        {pedido.items.map((item, index) => {
          const producto = productosDb.find(
            (prod) => prod.id.toString() === item.productoId.toString()
          );

          return producto ? (
            <div key={index} className="producto-card">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="imagen-producto"
              />
              <div>
                <p>{producto.nombre}</p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${item.precioUnitario}</p>
              </div>
            </div>
          ) : (
            <p key={index}>Producto no encontrado (ID: {item.productoId})</p>
          );
        })}
      </div>
    </div>
  );
}
