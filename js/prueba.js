// Datos personales
const apellidos = document.getElementById("apellidos");
const nombre = document.getElementById("nombre");
const sexo = document.getElementsByName("sexo");
const correo = document.getElementById("correo");

// Información
const llegada = document.getElementById("llegada");
const material = document.getElementById("material");
const textos = document.getElementById("textos");
const libros = document.getElementById("libros");

const usuarios = document.getElementById("usuarios");
const mensaje = document.getElementById("mensaje");

let usuariosArray = [];

function usuarioSeleccionado() {
  if (usuarios.selectedIndex === -1) {
    mensaje.textContent = "Ningún usuario seleccionado";
    mostrarDialogo();
    return false;
  }
  return true;
}

function visualizar() {
  if (!usuarioSeleccionado()) return;

  const user = usuariosArray[usuarios.selectedIndex];
  mensaje.innerHTML =
    `<b>Apellidos:</b> ${user.apellidos} <br>` +
    `<b>Nombre:</b> ${user.nombre} <br>` +
    `<b>Sexo:</b> ${user.sexo} <br>` +
    `<b>Correo electrónico:</b> ${user.correo} <br>` +
    `<b>Llegó hasta aquí:</b> ${user.llegada} <br>` +
    `<b>Desearía más información sobre:</b> ${user.intereses.join(", ")}`;
  mostrarDialogo();
}

function add() {
  if (!validarTexto(apellidos) || !validarTexto(nombre)) return;
  if (!validarSexo()) return;
  if (!validarCorreo()) return;
  if (!validarInfo()) return;
  const usuario = addDatos();
  addUsuario(usuario);
  vaciarCampos();
}

function validarTexto(texto) {
  if (texto.value == "") {
    mensaje.textContent = 'El campo "' + texto.title + '" no puede estar vacío';
    mostrarDialogo();
    return false;
  }
  return true;
}

function validarSexo() {
  if (!sexo[0].checked && !sexo[1].checked) {
    mensaje.textContent = 'Debe seleccionar un género en el campo "Sexo"';
    mostrarDialogo();
    return false;
  }
  return true;
}

function validarCorreo() {
  validarTexto(correo);
  const regex = /^[a-zA-Z0-9]{8,}@[a-zA-Z]{4,}\.[a-z]{2,3}$/gm;
  if (!regex.test(correo.value)) {
    mensaje.innerHTML =
      "Debe escribir un correo electrónico válido: <br>" +
      " - Usuario de 8 o más caracteres <br>" +
      " - Organización de 4 o más caracteres <br>" +
      " - Dominio entre 2 y 3 caracteres. Ej: com, es, org...";
    mostrarDialogo();
    return false;
  }
  return true;
}

function validarInfo() {
  if (!(material.checked || textos.checked || libros.checked)) {
    mensaje.textContent =
      'Debe seleccionar al menos una casilla en el campo de "Información"';
    mostrarDialogo();
    return false;
  }
  return true;
}

function addDatos() {
  const usuario = {
    apellidos: apellidos.value,
    nombre: nombre.value,
    sexo: sexo[0].checked ? "Hombre" : "Mujer",
    correo: correo.value,
    llegada: llegada.value,
    intereses: [],
  };
  if (material.checked) usuario.intereses.push(material.title);
  if (textos.checked) usuario.intereses.push(textos.title);
  if (libros.checked) usuario.intereses.push(libros.title);
  return usuario;
}

function addUsuario(usuario) {
  usuariosArray.push(usuario);
  const opcion = document.createElement("option");
  opcion.text = `${usuario.apellidos} ${usuario.nombre} -
    Correo electrónico: ${usuario.correo}`;
  usuarios.add(opcion);
}

function vaciarCampos() {
  apellidos.value = "";
  nombre.value = "";
  sexo[0].checked = false;
  sexo[1].checked = false;
  correo.value = "";
  llegada.options[2].selected = true;
  material.checked = false;
  textos.checked = false;
  libros.checked = false;
}

function borrar() {
  if (usuarioSeleccionado()) confirmar();
}

function confirmar() {
  const confirmacion = confirm("¿Seguro que quieres eliminar al usuario?");
  if (confirmacion === true) {
    const index = usuarios.selectedIndex;
    usuariosArray.splice(index, 1);
    usuarios.remove(index);
  }
}
