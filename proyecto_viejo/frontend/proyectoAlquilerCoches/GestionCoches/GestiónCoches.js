onload=()=> {
    // --- REFERENCIAS ---
    const selectTipo = document.getElementById('tipo_vehiculo');
    const dialogo = document.getElementById('vehicleDialog');
    const checkDevolucion = document.getElementById('devolver_diferente');
    const formulario = document.querySelector('form'); // O asigna un ID al form si prefieres
    
    // 1. CREAR DINÁMICAMENTE EL CAMPO DE DEVOLUCIÓN (Si no existe en el HTML)
    // Creamos un contenedor div para el input extra
    const contenedorDevolucion = document.createElement('div');
    contenedorDevolucion.id = 'container-devolucion-extra';
    contenedorDevolucion.style.display = 'none'; // Oculto por defecto
    contenedorDevolucion.style.marginTop = '10px';
    contenedorDevolucion.innerHTML = `
        <label style="font-weight:bold;">Ciudad de devolución:</label>
        <input type="text" id="ciudad_devolucion" name="ciudad_devolucion" placeholder="Introduce ciudad de entrega">
    `;
    // Lo insertamos justo después del párrafo donde está el checkbox
    checkDevolucion.closest('p').after(contenedorDevolucion);

        // helpers para reservas (localStorage)
        function obtenerReservas(){ try{ return JSON.parse(localStorage.getItem('reservas')||'[]'); }catch(e){ return []; } }
        function guardarReserva(res){ try{ const arr = obtenerReservas(); arr.push(res); localStorage.setItem('reservas', JSON.stringify(arr)); localStorage.setItem('reservas_last_update', Date.now().toString()); return true; }catch(e){ console.warn('Error guardando reserva', e); return false; } }

        // ayudante visual sencillo
        function mostrarToast(texto, isError){ const id='gc_toast'; try{ document.getElementById(id)&&document.getElementById(id).remove(); }catch(e){} const el=document.createElement('div'); el.id=id; el.style.position='fixed'; el.style.left='18px'; el.style.bottom='18px'; el.style.background = isError? '#ff6b6b' : '#4caf50'; el.style.padding='10px 12px'; el.style.color='#fff'; el.style.borderRadius='6px'; el.textContent=texto; document.body.appendChild(el); setTimeout(()=>el.remove(),2500); }

    // 2. ABRIR DIALOG AL SELECCIONAR "TODOS" (Evento Change)
    if(selectTipo) {
        selectTipo.addEventListener('change', function() {
            if (this.value === "todos") {
                abrirDialogo();
            }else if (this.value !== "todos") {
                this.value === "default"; 
            }
        });
    }

    // 3. MOSTRAR CAMPO EXTRA AL MARCAR CHECKBOX
    if(checkDevolucion) {
        checkDevolucion.addEventListener('change', function() {
            const inputExtra = document.getElementById('ciudad_devolucion');
            if (this.checked) {
                contenedorDevolucion.style.display = 'block';
                inputExtra.setAttribute('required', 'true'); // Hacerlo obligatorio
            } else {
                contenedorDevolucion.style.display = 'none';
                inputExtra.removeAttribute('required');
                inputExtra.value = ''; // Limpiar valor
            }
        });
    }

    // 3.c: Manejo de inputs de fecha (calendar) — establecer valores por defecto y validaciones
    const entradaRecogida = document.getElementById('recogida_fecha');
    const entradaDevolucion = document.getElementById('devolucion_fecha');

    function formatearFechaISO(d) {
        // d = Date
        return d.toISOString().split('T')[0];
    }

    if (entradaRecogida && entradaDevolucion) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Establecer minimo a hoy, valor por defecto a hoy/tomorrow
        entradaRecogida.min = formatearFechaISO(today);
        entradaRecogida.value = formatearFechaISO(today);

        entradaDevolucion.min = formatearFechaISO(today);
        entradaDevolucion.value = formatearFechaISO(tomorrow);

        // Cuando cambia la recogida asegurar que la devolución no sea anterior.
        entradaRecogida.addEventListener('change', function() {
            const pick = new Date(this.value);
            if (isNaN(pick.getTime())) return;

            // Permitir misma fecha o posterior — ajustar min para devolución
            const minReturn = new Date(pick);
            // Garantizar como mínimo mismo día; si quieres forzar al menos +1 día cambia aquí
            // minReturn.setDate(pick.getDate() + 1);

            entradaDevolucion.min = formatearFechaISO(minReturn);
            // Si la devolución actual es anterior, actualizarla al mínimo
            if (new Date(entradaDevolucion.value) < minReturn || isNaN(new Date(entradaDevolucion.value).getTime())) {
                entradaDevolucion.value = formatearFechaISO(minReturn);
            }
        });

        // Validación simple: devolución no puede estar antes que recogida
        entradaDevolucion.addEventListener('change', function() {
            const ret = new Date(this.value);
            const pick = new Date(entradaRecogida.value);
            if (ret < pick) {
                alert('La fecha de devolución no puede ser anterior a la de recogida.');
                this.value = formatearFechaISO(pick);
            }
        });
    }

    // 4. LOGICA DE BUSQUEDA Y REDIRECCIÓN
    // Buscamos el botón de submit dentro del formulario
    const botonBuscar = formulario.querySelector('button[type="submit"]');
    
    if(botonBuscar) {
        botonBuscar.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que el formulario recargue la página

            // Validar campo oficina principal: comprobar que existe o al menos no está vacío
            const oficina = document.getElementById('oficina').value && document.getElementById('oficina').value.trim();
            if(!oficina) {
                alert("Por favor, introduce una oficina de recogida (campo obligatorio).");
                return;
            }

            // Si existe un listado de oficinas guardadas en localStorage (clave 'oficinas'), comprobar que coincida
            const oficinasAlmacenadas = (() => {
                try { return JSON.parse(localStorage.getItem('oficinas')||'null'); } catch(e) { return null; }
            })();
            if (Array.isArray(oficinasAlmacenadas) && oficinasAlmacenadas.length) {
                const match = oficinasAlmacenadas.some(o => (o||'').toLowerCase().trim() === oficina.toLowerCase().trim());
                if (!match) {
                    alert('La oficina indicada no está registrada en el sistema. Por favor selecciona una oficina válida.');
                    return;
                }
            }

            // Validaciones de hora (rango 08:00 - 21:00) y que existan
            const horaRecogida = document.getElementById('recogida_hora').value;
            const horaDevolucion = document.getElementById('devolucion_hora').value;

            if (!horaRecogida || !horaDevolucion) {
                alert('Por favor, selecciona hora de recogida y de devolución.');
                return;
            }

            function horaAMinutos(hm) {
                const parts = hm.split(':');
                if (parts.length < 2) return NaN;
                return parseInt(parts[0],10)*60 + parseInt(parts[1],10);
            }

            const minPermitido = 8*60; // 08:00
            const maxPermitido = 21*60; // 21:00
            const rMin = horaAMinutos(horaRecogida);
            const rRet = horaAMinutos(horaDevolucion);
            if (isNaN(rMin) || isNaN(rRet)) {
                alert('Formato de hora inválido. Use formato HH:MM.');
                return;
            }
            if (rMin < minPermitido || rMin > maxPermitido || rRet < minPermitido || rRet > maxPermitido) {
                alert('Las horas deben estar entre 08:00 y 21:00.');
                return;
            }

            // Validación de fecha+hora: recogida <= devolucion
            const fechaRec = document.getElementById('recogida_fecha').value;
            const fechaDev = document.getElementById('devolucion_fecha').value;
            if (!fechaRec || !fechaDev) {
                alert('Por favor, selecciona fechas de recogida y devolución.');
                return;
            }
            const fechaHoraRecogida = new Date(`${fechaRec}T${horaRecogida}:00`);
            const fechaHoraDevolucion = new Date(`${fechaDev}T${horaDevolucion}:00`);
            if (isNaN(fechaHoraRecogida.getTime()) || isNaN(fechaHoraDevolucion.getTime())) {
                alert('Error al convertir fechas/horas. Revise los valores.');
                return;
            }
            if (fechaHoraDevolucion < fechaHoraRecogida) {
                alert('La fecha/hora de devolución no puede ser anterior a la de recogida.');
                return;
            }

            // Crear parámetros de URL
            const parametros = new URLSearchParams();
            parametros.append('oficina_recogida',  document.getElementById('oficina').value);
            // Envío de fechas y horas en formato ISO (fecha yyyy-mm-dd, hora HH:MM)
            parametros.append('fecha_recogida', document.getElementById('recogida_fecha').value);
            parametros.append('fecha_devolucion', document.getElementById('devolucion_fecha').value);
            parametros.append('hora_recogida', horaRecogida);
            parametros.append('hora_devolucion', horaDevolucion);

            // Si hay devolución diferente
            if (checkDevolucion.checked) {
                parametros.append('oficina_devolucion', document.getElementById('ciudad_devolucion').value);
            }

            // Si se usó el filtro avanzado (Dialog)
            if (selectTipo.value === "todos") {
                // Recoger marcas seleccionadas
                const marcas = obtenerValoresMarcados('marca');
                if(marcas.length) parametros.append('marcas', marcas.join(','));

                // Recoger modelos seleccionados
                const modelos = obtenerValoresMarcados('modelo');
                if(modelos.length) parametros.append('modelos', modelos.join(','));

                // Recoger precios
                parametros.append('precio_min', document.getElementById('precioMin').value);
                parametros.append('precio_max', document.getElementById('precioMax').value);
                // si elegiste 1 modelo concreto, añadir también un parámetro para que el catálogo lo muestre prioritario
                if (modelos.length === 1) parametros.append('mostrarCoche', modelos[0]);
            
            } else {
                // Si seleccionó solo "coches" o "furgonetas"
                parametros.append('tipo', selectTipo.value);
            }

                        // REDIRECCIONAR: mostrar pequeño mensaje y esperar 2 segundos antes de saltar
            mostrarMensajeRedirigiendo();
            // deshabilitar botón para evitar clicks repetidos
            botonBuscar.disabled = true;
            setTimeout(() => {
                window.location.href = `../login/Proyecto-AlquilerCoches/pagina_coches.html?${parametros.toString()}`;
            }, 2000);
        });
    }
};

// --- FUNCIONES AUXILIARES (Globales para que funcionen con onclicks del HTML si quedan) ---

function abrirDialogo() {
    const dialog = document.getElementById("vehicleDialog");
    if(dialog) dialog.showModal();
}

function cerrarDialogo(action) {
    const dialog = document.getElementById("vehicleDialog");
    if(dialog) dialog.close();
    
    // Si cancela, reseteamos el select para que no se quede en "todos"
    if(action === 'cancel') {
        document.getElementById('tipo_vehiculo').value = 'default'; // valor por defecto
    }
}

function aplicarFiltros() {
    // Simplemente cerramos, los datos se leerán al darle a "Buscar vehículos"
    cerrarDialogo();
}

// Función de ayuda para obtener valores de checkboxes marcados
function obtenerValoresMarcados(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Muestra una pequeña pantalla modal indicando que estamos redirigiendo
function mostrarMensajeRedirigiendo(texto = 'Redirigiendo — por favor espera...') {
    // Evitar duplicados
    if (document.getElementById('mensaje-redirect')) return;

    const overlay = document.createElement('div');
    overlay.id = 'mensaje-redirect';
    overlay.innerHTML = `
        <div class="mensaje-redirect-inner">
            <div class="spinner"></div>
            <div class="mensaje-texto">${texto}</div>
        </div>
    `;
    document.body.appendChild(overlay);
}