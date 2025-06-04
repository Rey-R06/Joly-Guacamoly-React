import HeaderHome from "../../components/headerHome/HeaderHome";
import PedidoCard from "../../components/cardPedidos/PedidoCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./clienteHome.css";

let apiPedidos = "https://683fbfa85b39a8039a558922.mockapi.io/pedidos";
let apiProductos = "https://683fac3a5b39a8039a5546ae.mockapi.io/productos";

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
  if (usuarioSesion && pedidosDb.length > 0) {
    const pedidosIds = usuarioSesion.historialPedidos?.map((id) => id.toString()) || [];
    setIdPedidos(pedidosIds);

    const filtrados = pedidosDb.filter((pedido) =>
      pedidosIds.includes(pedido.id.toString())
    );
    setPedidosUsuario(filtrados);
  }
}, [usuarioSesion, pedidosDb]);

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
          {console.log(pedidosUsuario)}
          {pedidosUsuario.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} productosDb={productosDb} />
          ))}
        </section>
      </section>
    </>
  );
}
