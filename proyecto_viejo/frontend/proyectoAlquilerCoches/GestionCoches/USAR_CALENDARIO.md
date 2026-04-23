Cómo funciona el calendario de recogida/devolución

Implementación:
- Sustituí los <select> de fecha por inputs nativos `type="date"` con ids:
  - `recogida_fecha` (recogida)
  - `devolucion_fecha` (devolución)

Comportamiento:
- Al cargar la página:
  - `recogida_fecha.min` = hoy
  - `recogida_fecha.value` = hoy
  - `devolucion_fecha.min` = hoy
  - `devolucion_fecha.value` = mañana
- Si cambias la fecha de recogida:
  - Se actualiza `devolucion_fecha.min` para que no pueda ser anterior a la recogida
  - Si la devolución actual es anterior, se corrige al mínimo
- Si intentas seleccionar una devolución anterior a la recogida aparece una alerta y se corrige automáticamente.

Notas / mejoras posibles:
- Si quieres que la devolución sea, como regla del negocio, MEDIA > 24h (siempre al menos 1 día después), cambia:
  - dentro de `GestiónCoches.js` la línea que calcula `minReturn` para añadir +1 día.
- Si prefieres una experiencia visual más rica (selección rango, compact date picker, estilos), podemos integrar una librería como `flatpickr` o `Pikaday`.

Compatibilidad:
- Inputs `type=date` son compatibles con la mayoría de navegadores modernos. En navegadores antiguos verán un input texto; podemos proporcionar un polyfill si lo necesitas.
