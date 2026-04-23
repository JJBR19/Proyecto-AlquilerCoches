Mejoras UI - Gestión de Coches

Resumen de cambios hechos para ordenar el formulario y mejorar el CSS:

1) Estructura HTML:
- Envuelto el contenido principal en `div.page-container` para que el CSS existente aplique un panel centrado
- Reorganizado el bloque de fechas en dos bloques (`.fecha-block`) para fecha y hora de recogida/devolución
- Agrupado el botón de envío en `.submit-row` con un mensaje y un botón de acción más visible

2) Estilos (GestionCoches.css):
- `.page-container`: margen reducido y contorno más suave, padding reajustado
- `.divFechas`: ahora usa grid de 2 columnas y se adapta al móvil (stack)
- Inputs más altos, padding consistente y mejor contraste con background
- `.submit-row` y `.primary-action`: botón más visible y nota explicativa
- `.parrafo1` ahora usa grid para alinear la oficina y el checkbox en una sola fila
- Responsivo: puntos para <= 720px, reorganizan las columnas

3) Validaciones JS:
- El JS ya valida la fecha/hora y rango 08:00-21:00 y la existencia de la oficina (localStorage opcional)

Cómo probar rápidamente:
- Abrir `GestionCoches/GestiónCoches.html` en el navegador
- Prueba distintos tamaños de pantalla y confirma que los campos estén alineados
- Intenta seleccionar horas fuera del rango (08:00-21:00) para ver la alerta
- Selecciona "Todos los vehículos" y aplica filtros para verificar que la redirección al catálogo incluya los parámetros

Nota sobre filtrado por URL:

- El catálogo (`login/Proyecto-AlquilerCoches/pagina_coches.html`) ahora acepta y aplica parámetros enviados por `GestiónCoches` en la URL: `marcas`, `modelos`, `precio_min`, `precio_max`, `tipo` y `mostrarCoche`.
- Ejemplo de URL generada: `pagina_coches.html?marcas=Toyota,Mercedes&modelos=Corolla&precio_min=100&precio_max=400&mostrarCoche=Corolla` — la página aplicará esos filtros al cargar.


Reservas / "carrito" (nuevo)

- Flujo A — Gestión → Catálogo → Alquilar:
	- Si primero completas el formulario en `GestionCoches` (fechas, horas y oficina) y vas al catálogo, al pulsar "Alquilar" en un coche la página creará una reserva usando las fechas/oficina ya enviadas.

- Flujo B — Catálogo → Gestión → Confirmar:
	- Si pulsas "Alquilar" en el catálogo sin haber seleccionado fechas, serás redirigido a `GestionCoches` con el coche prefijado. Allí completas las fechas y aceptas — la reserva se grabará directamente.

- Implementación técnica:
	- Las reservas se guardan en localStorage bajo la clave `reservas` (array de objetos con `coche`, `fecha_recogida`, `fecha_devolucion`, `hora_recogida`, `hora_devolucion`, `oficina_recogida`, ...).
	- El catálogo muestra el botón "Alquilar" y si un coche ya está reservado se marca como "Reservado" y se deshabilita el botón.

Ejemplo rápido para pruebas:

1. Abre `GestionCoches/GestiónCoches.html`, rellena fechas/horas/oficina y pulsa buscar → serás llevado a `pagina_coches.html`.
2. Haz click en "Alquilar" sobre un coche — la reserva se guardará automáticamente usando las fechas de la búsqueda.

O:

1. Abre `pagina_coches.html`, haz click en "Alquilar" en un coche → serás redirigido a `GestionCoches` con el coche prefijado.
2. Completa las fechas y pulsa buscar → la reserva se guardará y volverás al catálogo.

Reservas (nueva página en el área de usuario)

- He añadido una página `login/Proyecto-AlquilerCoches/reservas.html` donde el usuario podrá ver sus reservas guardadas en localStorage, y cancelarlas.
- También se añadió el enlace al menú de usuario (perfil -> Reservas) para acceder rápidamente.
