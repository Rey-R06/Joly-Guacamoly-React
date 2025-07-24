import HeaderHome from "../../components/headerHome/HeaderHome";
import PedidoCard from "../../components/cardPedidos/PedidoCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./clienteHome.css";

let apiPedidos = "https://product-manager-api-s77y.onrender.com/pedidos";
let apiProductos = "https://product-manager-api-s77y.onrender.com/productos";

export default function ClienteHome() {
  const [usuarioSesion] = useState(() => {
    return JSON.parse(localStorage.getItem("usuario")) || {};
  });

  const [pedidosUsuario, setPedidosUsuario] = useState([]);
  const [pedidosDb, setPedidosDb] = useState([]);
  const [productosDb, setProductosDb] = useState([]);

  useEffect(() => {
    fetch(apiPedidos)
      .then((res) => res.json())
      .then((data) => setPedidosDb(data))
      .catch((err) => console.log(err));
  }, []);

  console.log("----------------------------------------")
  console.log("Pedidos DB:",pedidosDb);

  useEffect(() => {
    fetch(apiProductos)
      .then((res) => res.json())
      .then((data) => setProductosDb(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
  if (usuarioSesion && pedidosDb.length > 0) {
    const pedidosIds = usuarioSesion.historialPedidos?.map((id) => id.toString()) || [];
    
    console.log("Historial pedidos:", pedidosIds);
    console.log("Pedidos DB:", pedidosDb.map(p => p.id.toString()));

    const filtrados = pedidosDb.filter((pedido) =>
      pedidosIds.includes(pedido.id.toString())
    );

    console.log("Pedidos filtrados:", filtrados);

    setPedidosUsuario(filtrados);
  }
}, [usuarioSesion, pedidosDb]);

  console.log("pedidos",pedidosUsuario)

  return (
    <>
      <HeaderHome cabecera={"Panel cliente"} />
      <section className="panel-cliente">
        <ul className="opciones-cliente">
          <li className="opcion-cliente">
            <Link to="#">Mis pedidos - {usuarioSesion.nombre}</Link>
          </li>
        </ul>
        <section className="pedidos-clientes">
          {pedidosUsuario.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} productosDb={productosDb} />
          ))}
        </section>
      </section>
    </>
  );
}
