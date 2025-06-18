import "./pedidoCard.css";

export default function PedidoCard({ pedido, productosDb }) {
  return (
    <div className="pedido-card">
      <h3>Pedido: {pedido.estado.replace("_", " ")}</h3>
      <p>Dirección: {pedido.direccionEntrega}</p>
      <p>Fecha: {new Date(pedido.fechaDelPedido).toLocaleDateString()}</p>
      <p>Total: ${pedido.totalCompra}</p>
      <p>Método de pago: {pedido.metodoDePago}</p>
      <div className="productos-pedido">
        {Array.isArray(pedido.itemsPedido) &&
          pedido.itemsPedido.map((item, index) => {
            if (!item) {
              console.warn(
                `Item undefined en index ${index}`,
                pedido.productos
              );
              return <p key={index}>Producto inválido</p>;
            }

            const idProductoItem = item?.producto?.id ?? null;

            const producto = productosDb.find(
              (prod) => prod?.id?.toString() === idProductoItem?.toString()
            );
            return producto ? (
              <div key={index} className="producto-card">
                <img
                  src={producto.urlImg}
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
              <p key={index}>Producto no encontrado (ID: {idProductoItem})</p>
            );
          })}
      </div>
    </div>
  );
}
