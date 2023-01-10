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

function random_num() {
  return Math.floor(Math.random() * 10 + 1);
}

function reiniciar() {
  document.location.reload();
}

let borrar_ayuda = (ayuda) =>
  setTimeout(() => {
    ayuda.innerText = "";
  }, 3000);

