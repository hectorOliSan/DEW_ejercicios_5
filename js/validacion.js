const nombre = document.getElementById("nombre");
const expediente = document.getElementById("expediente");
const apellido1 = document.getElementById("apellido1");
const apellido2 = document.getElementById("apellido2");
const edad = document.getElementById("edad");
const permiso = document.getElementById("permiso");
const matricula = document.getElementById("matricula");
const importe = document.getElementById("importe");
const tarjeta = document.getElementById("tarjeta");
const tipo = document.getElementById("tipo");
const mes = document.getElementById("mes");
const año = document.getElementById("año");

function validar() {
  if (
    !(
      validarTexto(nombre) &&
      validarRango(expediente, 340000000000, 349999999999) &&
      validarTexto(apellido1) &&
      validarTexto(apellido2) &&
      validarRango(edad, 18, 120) &&
      validarFecha(permiso) &&
      validarMatricula() &&
      validarImporte() &&
      validarTarjeta() &&
      comprobarMes(mes, mes.value) &&
      comprobarAño(año, año.value, 2001, 2100)
    )
  )
    return;
  visualizar();
}

function validarTexto(texto) {
  if (texto.value == "") {
    mensaje.textContent = `El campo "${texto.title}" no puede estar vacío`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function validarRango(campo, menor, mayor) {
  if (!validarTexto(campo)) return false;
  if (menor <= Number(campo.value) || Number(campo.value) >= mayor) return true;
  errorRango(campo, menor, mayor);
  return false;
}

function errorRango(campo, menor, mayor) {
  mensaje.textContent =
    `ERROR: Valor fuera del rango ${menor} - ${mayor}, ` +
    `en el campo "${campo.title}"`;
  mostrarDialogo();
}

function validarFecha(campo) {
  if (!validarTexto(campo)) return false;
  if (!validarFormato(campo)) return false;
  if (!validarFechaFormato(campo)) return false;
  return true;
}

function validarFormato(campo) {
  const formato = /^\d{1,2}\/\d{1,2}\/\d{1,4}$/;
  if (!formato.test(campo.value)) {
    mensaje.textContent =
      `ERROR: El formato debe ser "dd/mm/aaaa", ` +
      `en el campo "${campo.title}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function validarFechaFormato(campo) {
  const fecha = campo.value.split("/");
  const dd = parseInt(fecha[0]);
  const mm = parseInt(fecha[1]);
  const aaaa = parseInt(fecha[2]);

  // Fecha válida especificando rango de años entre 1 y el año actual
  if (!comprobarAño(campo, aaaa, 1, new Date().getFullYear())) return;
  if (!comprobarMes(campo, mm)) return;
  if (!comprobarDia(campo, dd, mm, aaaa)) return;

  return true;
}

function comprobarAño(campo, aaaa, menor, mayor) {
  if (!validarTexto(campo)) return false;

  // Comprobar que el año esté en el rango válido
  if (aaaa < menor || aaaa > mayor) {
    mensaje.textContent =
      `ERROR: El año debe estar entre ${menor} - ${mayor}, ` +
      `en el campo "${campo.title}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function comprobarMes(campo, mm) {
  if (!validarTexto(campo)) return false;

  // Comprobar que el mes esté en el rango válido
  if (mm < 1 || mm > 12) {
    mensaje.textContent =
      `ERROR: El mes debe estar entre Enero(1) - Diciembre(12), ` +
      `en el campo "${campo.title}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function comprobarDia(campo, dd, mm, aaaa) {
  // Comprobar que el día esté en el rango válido para el mes especificado
  const febrero = esBisiesto(aaaa) ? 29 : 28;
  const diasMaximos = [31, febrero, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dd < 1 || dd > diasMaximos[mm - 1]) {
    mensaje.textContent =
      `ERROR: El día(${dd}) no está en el rango válido ` +
      `para el mes(${mm}) especificado, en el campo "${campo.title}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function esBisiesto(aaaa) {
  return (aaaa % 4 === 0 && aaaa % 100 !== 0) || aaaa % 400 === 0;
}

function validarMatricula() {
  if (!validarTexto(matricula)) return false;
  const patron = /^\d{4}[B-Z]{3}$/;
  if (!patron.test(matricula.value)) {
    mensaje.textContent =
      `ERROR: El formato debe ser: "NNNN[BCDFGHJKLMNPQRSTVWXYZ]` +
      `[BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPORSTVWXYZ]", ` +
      `en el campo "${matricula.title}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function validarImporte() {
  if (!validarTexto(importe)) return false;
  const patron = /^\d*[.,]?\d+$/;
  if (!patron.test(importe.value)) {
    mensaje.textContent = `ERROR: El "${importe.title}" debe ser entero o real sin signo`;
    mostrarDialogo();
    return false;
  }
  return true;
}

// Array clave-valor para los tipos de tarjeta
const tiposTarjetas = {
  Generica: {
    // 2315467890
    Prefijo: /^[0-9]/,
    Digitos: [10],
  },
  AmericanExpress: {
    // 371449635399300
    Prefijo: /^3[47]/,
    Digitos: [15],
  },
  DinersClub: {
    // 30569309025913
    Prefijo: /^3(?:0[0-5]|[68])/,
    Digitos: [14],
  },
  MasterCard: {
    // 5555555555554444
    Prefijo: /^5[1-5]/,
    Digitos: [16],
  },
  Visa: {
    // 4311111111111101
    Prefijo: /^4/,
    Digitos: [13, 16],
  },
};

function validarTarjeta() {
  if (!validarTexto(tarjeta)) return false;

  const numero = tarjeta.value;
  const tipoTarjeta = tiposTarjetas[tipo.value];

  if (!comprobarDigitos(tipoTarjeta, numero)) return false;
  if (!comprobarPrefijo(tipoTarjeta, numero)) return false;
  return algoritmoLuhn(numero);
}

function comprobarDigitos(tipoTarjeta, numero) {
  if (!tipoTarjeta["Digitos"].includes(numero.length)) {
    mensaje.textContent =
      `ERROR: "${numero}" no cuenta con el número de dígitos adecuado, ` +
      `en el campo "${tarjeta.title}" para el tipo de tarjeta "${tipo.value}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function comprobarPrefijo(tipoTarjeta, numero) {
  const patron = tipoTarjeta["Prefijo"];
  if (!patron.test(numero)) {
    mensaje.textContent =
      `ERROR: "${numero}" no cuenta con el prefijo adecuado, ` +
      `en el campo "${tarjeta.title}" para el tipo de tarjeta "${tipo.value}"`;
    mostrarDialogo();
    return false;
  }
  return true;
}

function algoritmoLuhn(numero) {
  // Algoritmo de Luhn para comprobar la validez del número
  let suma = numero
    .split("")
    .reverse()
    .map((num, i) => {
      num = parseInt(num, 10);
      if (i % 2 === 0) {
        num *= 2;
        if (num > 9) num -= 9;
      }
      return num;
    })
    .reduce((a, b) => a + b);
  if (suma % 10 === 0) return true;
  mensaje.textContent =
    `ERROR: "${numero}" no es número válido de tarjeta ` +
    `según el algoritmo de Luhn, en el campo ${tarjeta.title}`;
  mostrarDialogo();
  return false;
}

function visualizar() {
  mensaje.innerHTML =
    `<b>Nombre:</b> ${nombre.value} <br>` +
    `<b>Nº de Expediente:</b> ${expediente.value} <br>` +
    `<b>Apellido 1:</b> ${apellido1.value} <br>` +
    `<b>Apellido 2:</b> ${apellido2.value} <br>` +
    `<b>Edad:</b> ${edad.value} <br>` +
    `<b>Fecha de Permiso:</b> ${permiso.value} <br>` +
    `<b>Matrícula:</b> ${matricula.value} <br>` +
    `<b>Importe:</b> ${importe.value} <br>` +
    `<b>Nº de Tarjeta:</b> ${tarjeta.value} <br>` +
    `<b>Tipo de Tarjeta:</b> ${tipo.value} <br>` +
    `<b>Mes de Expiración:</b> ${mes.value} <br>` +
    `<b>Año de Expiración:</b> ${año.value}`;
  mostrarDialogo();
}
