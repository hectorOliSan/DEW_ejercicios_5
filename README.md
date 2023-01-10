# Ejercicios para el alumnado:

## Prueba de un formulario
Se diseñará un formulario con los datos presentados en la figura siguiente. En el combo (select) se presentarán las siguientes opciones: a) Al azar. b) Le indicaron la URL de la página. c) A través de un buscador (opción por defecto) y d) Mediante un enlace desde otra página.

Al pulsarse el botón AÑADIR se introducirán apellidos, nombre y correo electrónico en la lista y cuando se haga clic en el botón VISUALIZAR DATOS se presentarán todos los datos elegidos en un cuadro de diálogo alert.

Al pulsar el botón eliminar se borra la selección de la lista. ¿selección activa? ¿último elemento introducido? ¿Cómo actúo si nó hay ningún elemento seleccionado?

Validar la dirección de correo electrónico.

<br>

## Validación de un formulario
Se diseñará un formulario como el de la imagen y al pulsarse el botón VALIDA FORMULARIO se realizarán las siguientes comprobaciones:
- Ningún cuadro de texto **(input type="text")** quedará vacío

- En nombre y apellidos solo se admitirán caracteres alfabéticos tanto en mayúsculas como en minúsculas

- El expediente será un número natural en el rango 340000000000 a 349999999999

- La edad otro número natural en el rango 18 a 120

- Fecha de permiso una fecha válida sin especificar rango

- La matrícula responderá al patrón "NNNN[BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPQRSTVWXY
Z] [BCDFGHJKLMNPORSTVWXYZ]"

- Importe entero o real sin signo

- Mes de expiración entero en el rango 1 a 12

- Año de expiración entero en el rango 2001 a 2100

- Se realizará la validación de la tarjeta para las opciones a) Genérica. b) American Express. c) Diner’s Club. e) Master Card y f) Visa.

Las rutinas básicas de validación se incluirán a través del archivo Validación.js

