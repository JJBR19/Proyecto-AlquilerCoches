var defaultCoches = [
  // --- Toyota ---
  { coche: "Toyota Corolla", marca: "Toyota", tipo: "Sedan compacto", imagen: "https://cdn.motor1.com/images/mgl/xqKVpq/483:0:2900:2176/prueba-toyota-corolla-200h-gr-sport.webp", precio: 300, año: 2024 },
  { coche: "Toyota Yaris", marca: "Toyota", tipo: "Hatchback", imagen: "https://images.coches.com/_vn_/toyota/Yaris/786b6075174e87c4660c187d43247288.jpg?w=1920&ar=16:9", precio: 250, año: 2023 },
  { coche: "Toyota Camry", marca: "Toyota", tipo: "Sedan mediano", imagen: "https://upload.wikimedia.org/wikipedia/commons/c/c7/%28USA-Massachusetts%29_Private_Toyota_Camry_NJ-Z22UKZ_2024-06-06.jpg", precio: 350, año: 2024 },
  { coche: "Toyota RAV4", marca: "Toyota", tipo: "SUV compacto", imagen: "https://kobemotor.es/wp-content/uploads/2024/05/Toyota-RAV4-GR-Sport-Plus.png", precio: 400, año: 2024 },
  { coche: "Toyota Highlander", marca: "Toyota", tipo: "SUV mediano", imagen: "https://images.prismic.io/carwow/ab0d2aa1-b2c2-483a-8414-21459ac0e78b_LHD+Toyota+Highlander+2021+Exterior-07.jpg?auto=format&cs=tinysrgb&fit=max&q=60", precio: 450, año: 2021 },
  // --- Mercedes ---
  { coche: "Mercedes Clase C", marca: "Mercedes", tipo: "Sedan de lujo", imagen: "https://carnovo.com/wp-content/uploads/2021/04/mercedes-clase-c-2021.jpg", precio: 500, año: 2021 },
  { coche: "Mercedes Clase A", marca: "Mercedes", tipo: "Hatchback compacto", imagen: "https://carscompany.es/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-25-at-19.52.38-1.jpeg", precio: 400, año: 2023 },
  { coche: "Mercedes GLA", marca: "Mercedes", tipo: "SUV compacto", imagen: "https://cms-assets.autoscout24.com/uaddx06iwzdz/7IKRovNku726FkOQtcrkW1/2473569ac45e79d5b7e53880e84c8b5d/Mercedes-Benz-GLA-2021-1024-04.jpg?w=1100&fit=fill", precio: 450, año: 2021 },
  { coche: "Mercedes GLE", marca: "Mercedes", tipo: "SUV mediano", imagen: "https://www.topgear.com/sites/default/files/2025/03/Medium-48689-mercedes-gle-53-0084.jpg", precio: 600, año: 2025 },
  { coche: "Mercedes Clase E", marca: "Mercedes", tipo: "Sedan ejecutivo", imagen: "https://static.motor.es/fotos-jato/mercedes/uploads/mercedes-clase-e-653ce03f75ebb.jpg", precio: 550, año: 2023 },
  // --- Audi ---
  { coche: "Audi A3", marca: "Audi", tipo: "Hatchback compacto", imagen: "https://todorenting.es/wp-content/uploads/2022/12/Audi-A3-Sportback-real-rentingGranada-779x520.webp", precio: 350, año: 2022 },
  { coche: "Audi A4", marca: "Audi", tipo: "Sedan mediano", imagen: "https://d1gl66oyi6i593.cloudfront.net/wp-content/uploads/2019/05/audi-a4-2019.jpg", precio: 400, año: 2019 },
  { coche: "Audi Q3", marca: "Audi", tipo: "SUV compacto", imagen: "https://fotos.quecochemecompro.com/audi-q3/audi-q3-2023-frontal-urbano.jpg?size=750x400", precio: 450, año: 2023 },
  { coche: "Audi Q5", marca: "Audi", tipo: "SUV mediano", imagen: "https://s3.abcstatics.com/media/motor/2020/12/18/AudiQ5_39_20201217195852-kXoH-U22658476037ExK-1248x698@abc.jpg", precio: 500, año: 2020 },
  { coche: "Audi A6", marca: "Audi", tipo: "Sedan ejecutivo", imagen: "https://www.km77.com/images/medium/9/3/9/3/audi-a6-frontal-lateral-2.339393.jpg", precio: 550, año: 2021 },
  // --- BMW ---
  { coche: "BMW Serie 3", marca: "BMW", tipo: "Sedan mediano", imagen: "https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/9888/bmw-serie-3-2018-delantera.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*", precio: 400, año: 2018 },
  { coche: "BMW Serie 1", marca: "BMW", tipo: "Hatchback compacto", imagen: "https://www.automovilesarturosoria.es/sites/default/files/styles/ficha/public/1%20-%203_106.jpg?itok=g8WTBIfd", precio: 350, año: 2019 },
  { coche: "BMW X1", marca: "BMW", tipo: "SUV compacto", imagen: "https://images.coches.com/_vn_/bmw/X1/819a15048fed68393cf665dc644a4205.jpg?w=1920&ar=16:9", precio: 450, año: 2020 },
  { coche: "BMW X3", marca: "BMW", tipo: "SUV mediano", imagen: "https://images.ecestaticos.com/BpHGu4aAhwaEdIFOT0IitSaiU7s=/338x235:1978x1465/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fa0b%2F7ba%2F451%2Fa0b7ba451e9fd00c0fa77c5e11b6eaec.jpg", precio: 500, año: 2021 },
  { coche: "BMW Serie 5", marca: "BMW", tipo: "Sedan ejecutivo", imagen: "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2VzL29yaWdpbmFsL0JNVy81LVNFUklFUy80Mzc2Nl9XQUdPTi01LURPT1JTL2Jtdy1zZXJpZS01LXRvdXJpbmctZnJvbnQtdmlldy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19", precio: 550, año: 2022 },
  // --- Alfa Romeo ---
  { coche: "Alfa Giulia", marca: "Alfa Romeo", tipo: "Sedan compacto", imagen: "https://www.alfaromeo.es/content/dam/alfa/cross/giulia/white-label-update/grid/key-strength/AR-GIULIA-M24-538X378-KEYSTRENGHTS-3.jpg", precio: 400, año: 2021 },
  { coche: "Alfa Stelvio", marca: "Alfa Romeo", tipo: "SUV mediano", imagen: "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2VzL29yaWdpbmFsL0FMRkEtUk9NRU8vU1RFTFZJTy80MTU1MF9TVVYtNS1ET09SUy9hbGZhLXJvbWVvLWdpdWxpYS1mcm9udC12aWV3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=", precio: 450, año: 2022 },
  { coche: "Alfa Romeo Tonale", marca: "Alfa Romeo", tipo: "SUV compacto", imagen: "https://hips.hearstapps.com/hmg-prod/images/alfa-romeo-tonale-plug-in-hybrid-q4-static-4-1668674772.jpg", precio: 400, año: 2023 },
  { coche: "Alfa 4C", marca: "Alfa Romeo", tipo: "Deportivo", imagen: "https://images.ctfassets.net/uaddx06iwzdz/4pcZKmvFdJlJhkLmMTVYKi/3517f6f025db8380af2f28cd26a65eba/alfa-romeo-4c-l-01.jpg", precio: 550, año: 2021 },
  { coche: "Alfa MiTo", marca: "Alfa Romeo", tipo: "Hatchback compacto", imagen: "https://fotos.quecochemecompro.com/alfa-romeo-mito/12643.jpg?size=750x400", precio: 350, año: 2020 }
];

// Combina por defecto con coches añadidos desde el panel de admin (localStorage)
var coches = defaultCoches.slice();
try {
  const saved = JSON.parse(localStorage.getItem('coches') || '[]');
  if (Array.isArray(saved)){
    saved.forEach(s => {
      // Normalizar entrada guardada para que tenga las mismas propiedades
      const modelo = s.modelo || '';
      const nombre = s.coche || (s.marca ? (s.marca + (modelo ? ' ' + modelo : '')) : '');
      const normalized = Object.assign({}, s, { coche: nombre });
      coches.push(normalized);
    });
  }
} catch(e){ console.warn('Error leyendo coches de localStorage', e); }

window.onload = function() {
  var secciones = document.querySelectorAll("section.marca");
  var selectMarca = document.getElementById("select-marca");
  var selectPrecio = document.getElementById("select-precio");

  // Añadir opciones de marca que provengan de coches añadidos por admin
  try {
    const opcionesExistentes = Array.from(selectMarca.options).map(o => o.value);
    const marcas = Array.from(new Set(coches.map(c => (c.marca||'').toUpperCase()).filter(Boolean)));
    marcas.forEach(m => {
      if (!opcionesExistentes.includes(m)){
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        selectMarca.appendChild(opt);
      }
    });
  } catch(e){ /* silencioso */ }

  // Función para renderizar la sección 'Novedades' con el último coche añadido
  function renderNovedades(){
    try{
      const raw = localStorage.getItem('latest_added');
      if (!raw) return;
      const latest = JSON.parse(raw);
      if (!latest) return;

      let novedades = document.querySelector('section.novedades');
      if (!novedades){
        novedades = document.createElement('section');
        novedades.className = 'novedades';
        const h = document.createElement('h1');
        h.textContent = 'Novedades';
        novedades.appendChild(h);
        const cont = document.createElement('div');
        cont.className = 'coches';
        novedades.appendChild(cont);
        // Insertar al final del catálogo (después de las secciones .marca)
        const marcas = document.querySelectorAll('section.marca');
        if (marcas && marcas.length){
          const last = marcas[marcas.length - 1];
          if (last && last.parentNode){
            last.parentNode.insertBefore(novedades, last.nextSibling);
          } else {
            document.body.appendChild(novedades);
          }
        } else {
          // alternativa: al final del body
          document.body.appendChild(novedades);
        }
      }

      const contenedor = novedades.querySelector('div.coches');
      contenedor.innerHTML = '';

      const div = document.createElement('div');
      div.className = 'coche';
      const img = document.createElement('img'); img.src = latest.imagen || '';
      const p = document.createElement('p');
      p.textContent = `${latest.marca || ''} ${latest.modelo || ''} - ${latest.tipo || ''} - Año: ${latest.año || ''} - Precio: ${latest.precio || ''}€/mes`;
      const btn = document.createElement('button'); btn.textContent = 'Alquilar';
      div.appendChild(img); div.appendChild(p); div.appendChild(btn);
      contenedor.appendChild(div);

      try{ localStorage.removeItem('latest_added'); }catch(e){}
    }catch(e){ console.warn('Error mostrando novedades', e); }
  }

  function mostrarCoches(marcaSeleccionada, ordenPrecio) {
    secciones.forEach(function(seccion) {
      var marca = seccion.querySelector("h2").textContent;
      var contenedor = seccion.querySelector("div.coches");
      contenedor.innerHTML = "";

      // marcaSeleccionada puede ser: "0", string (marca) o array de marcas en UPPERCASE
      const brandUpper = marca.toUpperCase();
      const matchBrand = (marcaSeleccionada === "0") || (Array.isArray(marcaSeleccionada) ? marcaSeleccionada.includes(brandUpper) : brandUpper === marcaSeleccionada);
      if (matchBrand) {
        seccion.style.display = "block";

        var cochesFiltrados = coches.filter(coche => (coche.marca||'').toUpperCase() === marca.toUpperCase());

        // Aplicar filtros adicionales que vienen desde la URL (si existen)
        try{
          // modelos (si vienen, cada modelo puede ser coincidencia por nombre o por propiedad modelo)
          if (filtrosURL && Array.isArray(filtrosURL.modelos) && filtrosURL.modelos.length){
            cochesFiltrados = cochesFiltrados.filter(c => {
              const cocheName = (c.coche||'').toLowerCase();
              const modeloProp = (c.modelo||'').toLowerCase();
              return filtrosURL.modelos.some(m => {
                const needle = m.toLowerCase();
                return modeloProp && (modeloProp === needle || modeloProp.indexOf(needle) !== -1) || (cocheName.indexOf(needle) !== -1);
              });
            });
          }

          // rango de precio
          if (filtrosURL && typeof filtrosURL.precioMin === 'number' && !isNaN(filtrosURL.precioMin)){
            cochesFiltrados = cochesFiltrados.filter(c => (Number(c.precio)||0) >= filtrosURL.precioMin);
          }
          if (filtrosURL && typeof filtrosURL.precioMax === 'number' && !isNaN(filtrosURL.precioMax)){
            cochesFiltrados = cochesFiltrados.filter(c => (Number(c.precio)||0) <= filtrosURL.precioMax);
          }

          // tipo (ej. SUV, Sedan...) — comprobamos coincidencia parcial ignorando mayúsculas
          if (filtrosURL && filtrosURL.tipo){
            const tipoNeedle = String(filtrosURL.tipo).toLowerCase();
            cochesFiltrados = cochesFiltrados.filter(c => (c.tipo||'').toLowerCase().indexOf(tipoNeedle) !== -1);
          }
        }catch(e){ /* silencioso si algo falla en los filtros adicionales */ }

        // Ordenar por precio
        if (ordenPrecio === "MENOR-MAYOR") {
          cochesFiltrados.sort((a, b) => (a.precio||0) - (b.precio||0));
        } else if (ordenPrecio === "MAYOR-MENOR") {
          cochesFiltrados.sort((a, b) => (b.precio||0) - (a.precio||0));
        }

        cochesFiltrados.forEach(coche => {
          var div = document.createElement("div");
          div.className = "coche";

          var img = document.createElement("img");
          img.src = coche.imagen || '';

          // Nombre visible del coche
          var title = document.createElement('h3');
          title.textContent = coche.coche || '';

          var p = document.createElement("p");
          p.textContent = `${coche.tipo || ''} - Año: ${coche.año || ''} - Precio: ${coche.precio || ''}€/mes`;

          var btn = document.createElement("button");
          btn.className = 'btn-alquilar';
          btn.textContent = "Alquilar";

          // almacenar nombre para referencia clara
          div.dataset.coche = coche.coche || '';

          // Si este coche ya está reservado, marcar/deshabilitar — comprobar solapamiento si la búsqueda incluye fechas
          try{
              const reservas = obtenerReservas();
            let isReserved = false;
            if (reservas && Array.isArray(reservas)){
              const paramsLocal = new URLSearchParams(window.location.search);
              const fRec = paramsLocal.get('fecha_recogida');
              const fDev = paramsLocal.get('fecha_devolucion');
              reservas.forEach(r => {
                if (!r || !(r.coche)) return;
                if ((r.coche||'').toLowerCase() !== (coche.coche||'').toLowerCase()) return;
                if (fRec && fDev){
                  const a1 = new Date(r.fecha_recogida);
                  const b1 = new Date(r.fecha_devolucion);
                  const a2 = new Date(fRec);
                  const b2 = new Date(fDev);
                  if (isNaN(a1.getTime())||isNaN(b1.getTime())||isNaN(a2.getTime())||isNaN(b2.getTime())){
                    isReserved = true;
                  } else if (!(b1 < a2 || b2 < a1)){
                    isReserved = true;
                  }
                } else {
                  isReserved = true;
                }
              });
            }
            if (isReserved){
              btn.textContent = 'Reservado';
              btn.disabled = true;
              btn.classList.add('reservado');
            }
          }catch(e){/* silencioso */}

          div.appendChild(img);
          div.appendChild(title);
          div.appendChild(p);
          div.appendChild(btn);
          contenedor.appendChild(div);
        });

        if (contenedor.children.length === 0) {
          seccion.style.display = "none";
        }

      } else {
        seccion.style.display = "none";
      }
    });
  }

  // ----------------------------------------
  // RESERVAS (carrito) - almacenamiento en localStorage
  // ----------------------------------------
  function obtenerReservas(){
    try{ return JSON.parse(localStorage.getItem('reservas')||'[]'); }catch(e){ return []; }
  }

  function guardarReserva(res){
    try{
      const arr = obtenerReservas();
      arr.push(res);
      localStorage.setItem('reservas', JSON.stringify(arr));
      // también escribir una marca 'reservas_last_update' para los eventos de localStorage
      localStorage.setItem('reservas_last_update', Date.now().toString());
      return true;
    }catch(e){ console.warn('Error guardando reserva', e); return false; }
  }

  // Cuando el usuario hace click en 'Alquilar' en el catálogo
  document.body.addEventListener('click', function(ev){
    const btn = ev.target && ev.target.closest && ev.target.closest('button.btn-alquilar');
    if(!btn) return;
    // determinar el nombre del coche: subir por el DOM al .coche y leer texto
    const cocheNode = btn.closest('.coche');
    if(!cocheNode) return;
    const carName = (cocheNode.dataset && cocheNode.dataset.coche) ? cocheNode.dataset.coche : ((cocheNode.textContent||'').split('-')[0].trim() || null);

    // Si la página tiene fechas/oficina en parámetros, crear reserva inmediatamente
    const params = new URLSearchParams(window.location.search);
    const oficina = params.get('oficina_recogida') || params.get('oficina');
    const fechaRec = params.get('fecha_recogida');
    const fechaDev = params.get('fecha_devolucion');
    const horaRec = params.get('hora_recogida');
    const horaDev = params.get('hora_devolucion');
    const imgNode = cocheNode.querySelector('img');
    const imagenSrc = imgNode ? imgNode.src : (coche.imagen || '');

    if (oficina && fechaRec && fechaDev && horaRec && horaDev && carName){
      // Crear reserva
      // intentar sacar imagen del card
      const reserva = {
        id: 'r_' + Date.now(),
        coche: carName,
        oficina_recogida: oficina,
        fecha_recogida: fechaRec,
        fecha_devolucion: fechaDev,
        hora_recogida: horaRec,
        hora_devolucion: horaDev,
        imagen: imagenSrc,
        createdAt: new Date().toISOString()
      };
      const ok = guardarReserva(reserva);
      if (ok){
        btn.textContent = 'Reservado'; btn.disabled = true; btn.classList.add('reservado');
        mostrarMensaje('Reserva añadida al carrito');
      } else {
        mostrarMensaje('Error guardando reserva', true);
      }
      return;
    }

    // Si NO hay fechas/oficina en la URL, redirigir a la página de gestión para que complete el formulario
    if (carName){
      // mostrar aviso al usuario antes de redirigir
      mostrarMensaje('Necesitas completar el formulario de alquiler — te llevamos a Gestión Coches', false);
      // redirigir con prefill del coche, informando que venimos del catálogo
      const goUrl = '../../GestionCoches/GestionCoches.html';
      setTimeout(()=>{ window.location.href = goUrl; }, 3000);
      return;
    }
  });

  function mostrarMensaje(msg, error){
    // notificación temporal sencilla
    const id = 'pc_msg';
    let el = document.getElementById(id);
    if (el) el.remove();
    el = document.createElement('div'); el.id = id; el.style.position='fixed'; el.style.right='18px'; el.style.bottom='18px'; el.style.padding='10px 14px'; el.style.background = error? '#ff6b6b':'#4caf50'; el.style.color='white'; el.style.borderRadius='6px'; el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(()=>{ try{ el.remove(); }catch(e){} }, 2500);
  }

  // Inicializar mostrando todas las marcas y sin ordenar
  mostrarCoches("0", "0");

  // --- PARSEAR PARÁMETROS EN LA URL Y APLICARLOS ---
  // Soporta: marcas (csv), modelos (csv), precio_min, precio_max, tipo, mostrarCoche, ordenPrecio
  const filtrosURL = {};
  function aplicarFiltrosDesdeURL(){
    try{
      const params = new URLSearchParams(window.location.search);
      if (!params || Array.from(params).length === 0) return false;

      if (params.has('marcas')){
        filtrosURL.marcas = params.get('marcas').split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
      }
      if (params.has('modelos')){
        filtrosURL.modelos = params.get('modelos').split(',').map(s=>s.trim()).filter(Boolean);
      }
      if (params.has('precio_min')) filtrosURL.precioMin = parseFloat(params.get('precio_min'));
      if (params.has('precio_max')) filtrosURL.precioMax = parseFloat(params.get('precio_max'));
      if (params.has('tipo')) filtrosURL.tipo = params.get('tipo');
      if (params.has('mostrarCoche')) filtrosURL.mostrarCoche = params.get('mostrarCoche');
      // GestionCoches no envía orden de precio, pero si lo trae, lo respetamos
      if (params.has('ordenPrecio')) urlFilters.ordenPrecio = params.get('ordenPrecio');

      // Ajustar selects en la UI para reflejar filtro aplicado (si aplica)
      if (filtrosURL.marcas && filtrosURL.marcas.length && selectMarca){
        // Si viene una única marca, mostrarla en el select (si existe)
        if (urlFilters.marcas.length === 1 && Array.from(selectMarca.options).some(o=>o.value === urlFilters.marcas[0])){
          selectMarca.value = urlFilters.marcas[0];
        } else {
          // dejar el select en '0' para que el usuario pueda ver que varios seleccionados
          selectMarca.value = '0';
        }
      }
      if (filtrosURL.ordenPrecio && selectPrecio) selectPrecio.value = filtrosURL.ordenPrecio;

      // Llamar a renderización con filtros de URL: marcas puede ser array
      mostrarCoches(filtrosURL.marcas && filtrosURL.marcas.length ? filtrosURL.marcas : "0", filtrosURL.ordenPrecio || selectPrecio.value);

      // Si hay que resaltar o mostrar un coche concreto, hacerlo tras render
      if (filtrosURL.mostrarCoche) {
        setTimeout(()=>{
          try{
            const needle = filtrosURL.mostrarCoche.toLowerCase();
            const nodes = document.querySelectorAll('.coche');
            for (const n of nodes){
              const text = (n.textContent||'').toLowerCase();
              if (text.indexOf(needle) !== -1){
                n.style.outline = '3px solid #ffb86b';
                n.scrollIntoView({behavior:'smooth', block:'center'});
                break;
              }
            }
          }catch(e){}
        }, 200);
      }

      return true;
    }catch(e){ console.warn('Error parseando filtros de URL', e); return false; }
  }

  // Ejecutar parsing en carga (si hay parámetros la función se encargará de renderizar usando ellos)
  aplicarFiltrosDesdeURL();

  selectMarca.addEventListener("change", () => mostrarCoches(selectMarca.value, selectPrecio.value));
  selectPrecio.addEventListener("change", () => mostrarCoches(selectMarca.value, selectPrecio.value));

  // Mostrar novedades si existe un coche recién añadido
  try{ if (typeof renderNovedades === 'function') renderNovedades(); }catch(e){}

  // Escuchar cambios en localStorage (cuando se añade/editar/borrar coches desde admin en otra pestaña)
  window.addEventListener('storage', function(ev){
    if (ev.key === 'coches' || ev.key === 'coches_last_update'){
      try{
        // reconstruir lista de coches combinando por defecto + guardados
        coches = defaultCoches.slice();
        const savedRaw = ev.key === 'coches' ? ev.newValue : localStorage.getItem('coches');
        const saved = JSON.parse(savedRaw || '[]');
        if (Array.isArray(saved)){
          saved.forEach(s => {
            const modelo = s.modelo || '';
            const nombre = s.coche || (s.marca ? (s.marca + (modelo ? ' ' + modelo : '')) : '');
            const normalized = Object.assign({}, s, { coche: nombre });
            coches.push(normalized);
          });
        }

        // actualizar select de marcas (añadir nuevas si hacen falta)

    // Escuchar BroadcastChannel para actualizaciones en tiempo real
    try{
      if (typeof BroadcastChannel !== 'undefined'){
        const bc = new BroadcastChannel('coches_channel');
        bc.onmessage = function(m){
          if (m && m.data && m.data.type === 'update'){
            try{
              coches = defaultCoches.slice();
              const saved = JSON.parse(localStorage.getItem('coches')||'[]');
              if (Array.isArray(saved)){
                saved.forEach(s => {
                  const modelo = s.modelo || '';
                  const nombre = s.coche || (s.marca ? (s.marca + (modelo ? ' ' + modelo : '')) : '');
                  const normalized = Object.assign({}, s, { coche: nombre });
                  coches.push(normalized);
                });
              }
              // actualizar marcas y vista
              const opcionesExistentes = Array.from(selectMarca.options).map(o => o.value);
              const marcas = Array.from(new Set(coches.map(c => (c.marca||'').toUpperCase()).filter(Boolean)));
              marcas.forEach(mk => {
                if (!opcionesExistentes.includes(mk)){
                  const opt = document.createElement('option');
                  opt.value = mk;
                  opt.textContent = mk;
                  selectMarca.appendChild(opt);
                }
              });
              mostrarCoches(selectMarca.value, selectPrecio.value);
              try{ renderNovedades(); }catch(e){}
            }catch(e){ console.warn('Error procesando broadcast message', e); }
          }
        };
      }
    }catch(e){/* silencioso */}
        const opcionesExistentes = Array.from(selectMarca.options).map(o => o.value);
        const marcas = Array.from(new Set(coches.map(c => (c.marca||'').toUpperCase()).filter(Boolean)));
        marcas.forEach(m => {
          if (!opcionesExistentes.includes(m)){
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            selectMarca.appendChild(opt);
          }
        });

        // refrescar la vista con los filtros actuales
        mostrarCoches(selectMarca.value, selectPrecio.value);
        // mostrar novedades si hay una añadida
        try{ if (typeof renderNovedades === 'function') renderNovedades(); }catch(e){}
      }catch(e){ console.warn('Error procesando storage event coches', e); }
    }
  });
};
