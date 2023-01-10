// Validar correo electrónico

/**
 * Empezar por letra
 * Nombre del usuario >= 8 caracteres
 * Organización >= 4 caracteres
 * Tipo del dominio 2-3 caracteres, Ej: .com o .es
 */
const pattern =
  /^[a-zA-Z](?:[a-zA-Z0-9._+-]){7,}?@[a-z]{4,}(?:\.[a-z]+)*?(?:\.[a-z]{2,3}){1}?$/;

function validar() {
  let correo_ayuda = document.getElementById("correo_ayuda");
  let correo = document.getElementById("mail").value;
  if (correo == "") {
    correo_ayuda.innerText = "> Debes escribir un correo electrónico";
    borrar_ayuda(correo_ayuda);
    return;
  }
  if (pattern.test(correo)) {
    let m = "La dirección de email: <b>" + correo + "</b> es <b>CORRECTA!</b>";
    crearAlerta("alert-success", m);
  } else {
    let m =
      "La dirección de email: <b>" +
      correo +
      "</b> es <b>INCORRECTA!</b><br>" +
      "Debe cumplir:<br>" +
      "<ul>" +
      "<li>Empezar por letra</li>" +
      "<li>Nombre del usuario >= 8 caracteres</li>" +
      "<li>Organización >= 4 caracteres</li>" +
      "<li>Tipo del dominio 2-3 caracteres, Ej: .com o .es</li>" +
      "</ul>";
    crearAlerta("alert-danger", m);
  }
}

crearAlerta = (color, mensaje) => {
  let respuesta = document.getElementById("res_correo");
  respuesta.innerHTML =
    "<div class='mb-5 alert " +
    color +
    " alert-dismissible fade show'>" +
    mensaje +
    "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>" +
    "</div>";
};
