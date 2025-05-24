import { Link, Outlet} from "react-router-dom";
import HeaderHome from "../../components/headerHome/HeaderHome";
import "./adminHome.css";

export default function AdminHome(){

  return (
    <section className="admin-home">
      <HeaderHome cabecera={"Panel de Administración"}/>
      <section className="admin-panel">
        <h2>Gestión</h2>
        <ul className="admin-cards">
          <li>
            <Link to="gestion-productos">
              <button className="admin-card">Productos</button>
            </Link>
          </li>
          <li>
            <Link to="gestion-clientes">
              <button className="admin-card">Clientes</button>
            </Link>
          </li>
          <li>
            <Link to="gestion-pedidos">
              <button className="admin-card">Pedidos</button>
            </Link>
          </li>
          <li>
            <Link to="gestion-admins">
              <button className="admin-card">Administradores</button>
            </Link>
          </li>
        </ul>

        {/* Aquí se mostrará el componente hijo seleccionado */}
        <Outlet />
      </section>
    </section>
  );
};


