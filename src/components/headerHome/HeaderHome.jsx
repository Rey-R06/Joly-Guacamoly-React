import { useNavigate, Link } from "react-router-dom";
import { alertaRedireccion } from "../../helpers/funciones";
import "./headerHome.css"

export default function HeaderHome({cabecera}) {
const navigate = useNavigate()

  function cerrarSesion() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    alertaRedireccion(navigate, "Sesion finalizada", "En Breves segundos cerraremos la sesión", "info", "/")
  }
  return (
      <header className="admin-header">
        <h2>{cabecera}</h2>
        <section className="botones">
        <Link to={"/"} className="btn-volver">
          Ver Sitio Público
        </Link>
        <button onClick={cerrarSesion} type='button' className="cerrar-sesion">Cerrar sesión</button>
        </section>
      </header>
  )
}
