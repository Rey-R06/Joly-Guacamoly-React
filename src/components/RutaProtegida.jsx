import { Navigate } from "react-router-dom";

function RutaProtegida({ proteger, rolRequerido }) {
  let tokenAcceso = localStorage.getItem("token");
  let usuarioSesion = JSON.parse(localStorage.getItem("usuario"));

  if (!tokenAcceso || !usuarioSesion) {
    return <Navigate to="/" />;
  }

  if (rolRequerido && usuarioSesion.rol !== rolRequerido) {
    return <Navigate to="/" />;
  }

  return proteger;
}

export default RutaProtegida;
