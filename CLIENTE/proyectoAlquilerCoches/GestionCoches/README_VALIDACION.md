Validación y flujo de búsqueda - Gestión de Coches

Qué valida ahora el formulario de reserva/gestión:

1) Fechas
- `recogida_fecha` y `devolucion_fecha` son inputs tipo `date`.
- La devolución no puede ser anterior a la recogida; si lo intentas, se muestra alerta y se corrige automáticamente.

2) Horas
- `recogida_hora` y `devolucion_hora` son inputs tipo `time`.
- Se obliga a valores entre 08:00 y 21:00 (inclusive). Si la hora no está en ese rango aparece una alerta.
- También se valida que la fecha+hora de devolución no sea anterior a la fecha+hora de recogida.

3) Oficina
- `oficina` es obligatoria (no puede dejarse vacía).
- Si existe en localStorage una clave `oficinas` (array JSON), se comprobará que la oficina introducida esté en esa lista; si no existe dará un error.

4) Redirección y filtros
- Si todo es válido, el formulario redirige a `pagina_coches.html` con parámetros en la URL:
  - `oficina_recogida`, `fecha_recogida`, `hora_recogida`, `fecha_devolucion`, `hora_devolucion`, `oficina_devolucion` (si se usa)
  - Si abriste el diálogo de filtros y marcaste modelos se envía `modelos` con la lista (comma-separated).
  - Si se seleccionó exactamente 1 modelo, se añade `mostrarCoche` con ese modelo para que el catálogo lo muestre prioritario.

5) Comprobación en el Catálogo
- `pagina_coches.js` ahora lee `mostrarCoche` (o `modelos`/`marcas`/`precio_min`/`precio_max`) y muestra los coches filtrados acorde con los parámetros recibidos.

SUGERENCIAS:
- Si prefieres que la devolución sea siempre al menos al día siguiente, cambia la lógica en `GestiónCoches.js` en la función que calcula el `minReturn`.
- Para una UI de calendario más rica podemos integrar `flatpickr` o `Pikaday`.
