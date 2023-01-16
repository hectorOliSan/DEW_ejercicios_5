// Index
function actividad() {
  let ejer = document.getElementById("actividad").value;
  window.location.href = "./actividades/" + ejer + ".html";
}

// General
function descripcion() {
  window.modal.showModal();
}

function cerrar() {
  window.modal.close();
}

function mostrarDialogo() {
  if (!dialogo.open) window.dialogo.showModal();
}

function cerrarDialogo() {
  window.dialogo.close();
}

function soloLetras() {
  let caracter = event.charCode || event.keyCode;
  if (
    (caracter < 65 || caracter > 90) &&
    (caracter < 97 || caracter > 122) &&
    (caracter < 192 || caracter > 255) &&
    caracter != 32
  ) {
    event.preventDefault();
  }
}

function soloNumeros() {
  let caracter = event.charCode || event.keyCode;
  if (caracter < 48 || caracter > 57) {
    event.preventDefault();
  }
}

function soloNumerosPuntoComa() {
  let caracter = event.charCode || event.keyCode;
  if ((caracter < 48 || caracter > 57) && caracter != 44 && caracter != 46) {
    event.preventDefault();
  }
}

function soloNumerosBarra() {
  let caracter = event.charCode || event.keyCode;
  if ((caracter < 48 || caracter > 57) && caracter != 47) {
    event.preventDefault();
  }
}
