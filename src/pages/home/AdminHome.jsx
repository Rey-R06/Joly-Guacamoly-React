import { Link, Outlet, useNavigate } from "react-router-dom";
import { alertaRedireccion } from "../../helpers/funciones";
import "./adminHome.css";

export default function AdminHome(){
const navigate = useNavigate()

  function cerrarSesion() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    alertaRedireccion(navigate, "Sesion finalizada", "En Breves segundos cerraremos la sesión", "info", "/")
  }

  return (
    <section className="admin-home">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <button onClick={cerrarSesion} type='button' className="aplicacion__menu-lateral-navegacion-item">Cerrar sesión</button>
        <Link to={"/"} className="btn-volver">
          Ver Sitio Público
        </Link>
      </header>

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


