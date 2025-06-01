import Swal from "sweetalert2";

export function alertaConfirmacion(titulo, mensaje) {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

export function alertaError(mensaje) {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
    confirmButtonText: "Aceptar",
  });
}

export function alertaRedireccion(redireccion, titulo, mensaje, icono, url) {
  let timerInterval;
  Swal.fire({
    title: titulo,
    html: `${mensaje}<br><strong>Redirigiendo en <b></b> segundos...</strong>`,
    timer: 2000,
    icon: icono,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      redireccion(url);
    },
  });
}

export function generarToken() {
  return Math.random().toString(36).substring(2, 10);
}
