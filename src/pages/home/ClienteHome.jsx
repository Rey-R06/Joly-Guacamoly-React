import HeaderHome from "../../components/headerHome/HeaderHome";
import PedidoCard from "../../components/cardPedidos/PedidoCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./clienteHome.css";

let apiPedidos = "http://localhost:3001/pedidos";
let apiProductos = "http://localhost:3001/productos";

export default function ClienteHome() {
  const [usuarioSesion] = useState(() => {
    return JSON.parse(localStorage.getItem("usuario")) || {};
  });

  const [idPedidos, setIdPedidos] = useState([]);
  const [pedidosUsuario, setPedidosUsuario] = useState([]);
  const [pedidosDb, setPedidosDb] = useState([]);
  const [productosDb, setProductosDb] = useState([]);

  useEffect(() => {
    fetch(apiPedidos)
      .then((res) => res.json())
      .then((data) => setPedidosDb(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(apiProductos)
      .then((res) => res.json())
      .then((data) => setProductosDb(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (usuarioSesion?.historialPedidos?.length && idPedidos.length === 0) {
      setIdPedidos(usuarioSesion.historialPedidos);
    }
  }, [usuarioSesion, idPedidos.length]);

  useEffect(() => {
    if (idPedidos.length > 0 && pedidosDb.length > 0) {
      const filtrados = pedidosDb.filter((pedido) =>
        idPedidos.includes(Number(pedido.id))
      );
      setPedidosUsuario(filtrados);
    }
  }, [idPedidos, pedidosDb]);

  return (
    <>
      <HeaderHome cabecera={"Panel cliente"} />
      <section className="panel-cliente">
        <ul className="opciones-cliente">
          <li className="opcion-cliente">
            <Link>Mis pedidos - {usuarioSesion.nombre}</Link>
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
