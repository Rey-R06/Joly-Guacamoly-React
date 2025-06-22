import { Link, Outlet } from "react-router-dom";
import HeaderHome from "../../components/headerHome/HeaderHome";
import "./adminHome.css";

export default function AdminHome() {
  return (
    <section className="admin-home">
      <HeaderHome cabecera={"Panel de Administración"} />
      <section className="admin-panel">
        <h2 className="admin-title">Panel de Gestión</h2>
        <div className="admin-cards-grid">
          <Link to="gestion-productos" className="admin-card">
            <h3>Productos</h3>
            <p>Gestionar catálogo de productos.</p>
          </Link>

          <Link to="gestion-clientes" className="admin-card">
            <h3>Clientes</h3>
            <p>Ver y administrar clientes registrados.</p>
          </Link>

          <Link to="gestion-pedidos" className="admin-card">
            <h3>Pedidos</h3>
            <p>Revisar y actualizar pedidos.</p>
          </Link>

          <Link to="gestion-admins" className="admin-card">
            <h3>Administradores</h3>
            <p>Gestionar usuarios administradores.</p>
          </Link>
        </div>

        {/* Aquí se mostrará el componente hijo seleccionado */}
        <Outlet />
      </section>
    </section>
  );
}
