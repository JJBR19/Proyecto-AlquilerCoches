(function(){
  // Comprueba permisos admin
  const usuarioJson = localStorage.getItem('usuarioActivo');
  const accessMsg = document.getElementById('accessMsg');
  const panels = document.getElementById('adminPanels');
  if (!usuarioJson) {
    accessMsg.textContent = 'No hay sesión iniciada. Accede como administrador.';
    return;
  }
  const usuario = JSON.parse(usuarioJson);
  if (!(usuario.role === 'admin' || usuario.usuario === 'admin')) {
    accessMsg.textContent = 'No tienes permisos para ver esta página.';
    return;
  }
  accessMsg.style.display = 'none';
  panels.style.display = '';

  // --- USUARIOS ---
  const tablaUsuarios = document.querySelector('#tablaUsuarios tbody');
  const tUsuarioTemplate = document.getElementById('usuario-row');

  function loadUsuarios(){
    tablaUsuarios.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]');
    usuarios.forEach((u, idx)=>{
      const tr = tUsuarioTemplate.content.cloneNode(true);
      tr.querySelector('.u-nombre').textContent = u.nombre || '';
      tr.querySelector('.u-usuario').textContent = u.usuario || '';
      tr.querySelector('.u-email').textContent = u.correo || u.email || '';
      tr.querySelector('.u-role').textContent = u.role || 'user';
      tr.querySelector('.editar').addEventListener('click', ()=> editUsuario(idx));
      tr.querySelector('.borrar').addEventListener('click', ()=> borrarUsuario(idx));
      tablaUsuarios.appendChild(tr);
    });
  }

  function editUsuario(idx){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]');
    const u = usuarios[idx];
    const nuevoNombre = prompt('Nombre', u.nombre||'');
    if (nuevoNombre===null) return;
    const nuevoUsuario = prompt('Usuario', u.usuario||'');
    if (nuevoUsuario===null) return;
    const nuevoCorreo = prompt('Correo', u.correo||u.email||'');
    if (nuevoCorreo===null) return;
    const nuevoRole = prompt('Rol (admin/user)', u.role||'user');
    if (nuevoRole===null) return;
    usuarios[idx] = Object.assign(u, { nombre: nuevoNombre, usuario: nuevoUsuario, correo: nuevoCorreo, email: nuevoCorreo, role: nuevoRole });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    loadUsuarios();
  }

  function borrarUsuario(idx){
    if (!confirm('¿Borrar usuario?')) return;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]');
    usuarios.splice(idx,1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    loadUsuarios();
  }

  document.getElementById('btnNuevoUsuario').addEventListener('click', ()=>{
    const nombre = prompt('Nombre'); if (nombre===null) return;
    const usuarioN = prompt('Usuario'); if (usuarioN===null) return;
    const correo = prompt('Correo'); if (correo===null) return;
    const contrasena = prompt('Contraseña'); if (contrasena===null) return;
    const role = prompt('Rol (admin/user)','user'); if (role===null) return;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')||'[]');
    usuarios.push({ nombre, apellidos:'', correo, usuario: usuarioN, contrasena, role });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    loadUsuarios();
  });

  // --- COCHES ---
  const MARCAS_VALIDAS = ["Toyota", "Mercedes", "Audi", "BMW", "Alfa Romeo"];
  const tablaCoches = document.querySelector('#tablaCoches tbody');
  const tCocheTemplate = document.getElementById('coche-row');
  const bc = (typeof BroadcastChannel !== 'undefined') ? new BroadcastChannel('coches_channel') : null;

  function loadCoches(){
    tablaCoches.innerHTML = '';
    const coches = JSON.parse(localStorage.getItem('coches')||'[]');
    coches.forEach((c, idx)=>{
      const tr = tCocheTemplate.content.cloneNode(true);
      tr.querySelector('.c-nombre').textContent = `${c.marca||''} ${c.modelo||''}`;
      tr.querySelector('.c-precio').textContent = c.precio ? c.precio + '€' : '';
      tr.querySelector('.editarC').addEventListener('click', ()=> editCoche(idx));
      tr.querySelector('.borrarC').addEventListener('click', ()=> borrarCoche(idx));
      tablaCoches.appendChild(tr);
    });
  }

  function editCoche(idx){
    openCocheForm('edit', idx);
  }

  function borrarCoche(idx){
    if (!confirm('¿Borrar coche?')) return;
    const coches = JSON.parse(localStorage.getItem('coches')||'[]');
    coches.splice(idx,1);
    localStorage.setItem('coches', JSON.stringify(coches));
    try{ localStorage.setItem('coches_last_update', Date.now().toString()); }catch(e){}
    if (bc) try{ bc.postMessage({type:'update'}); }catch(e){}
    loadCoches();
  }

  // --- Form modal para coches ---
  const modal = document.getElementById('cocheFormModal');
  const saveCarBtn = document.getElementById('saveCarBtn');
  const cancelCarBtn = document.getElementById('cancelCarBtn');
  const carMarca = document.getElementById('carMarca');
  const carModelo = document.getElementById('carModelo');
  const carTipo = document.getElementById('carTipo');
  const carAnio = document.getElementById('carAnio');
  const carPrecio = document.getElementById('carPrecio');
  const carImagenUrl = document.getElementById('carImagenUrl');
  const carImagenFile = document.getElementById('carImagenFile');
  const carPreview = document.getElementById('carPreview');
  const cocheFormTitle = document.getElementById('cocheFormTitle');

  let editingIndex = -1;

  document.getElementById('btnNuevoCoche').addEventListener('click', ()=> openCocheForm('new'));
  const btnAbrirCatalogo = document.getElementById('btnAbrirCatalogo');
  if (btnAbrirCatalogo){
    btnAbrirCatalogo.addEventListener('click', ()=>{
      try{ localStorage.setItem('coches_last_update', Date.now().toString()); }catch(e){}
      window.open('pagina_coches.html','_blank');
    });
  }

  function openCocheForm(mode, idx){
    editingIndex = typeof idx === 'number' ? idx : -1;
    cocheFormTitle.textContent = mode === 'new' ? 'Nuevo Coche' : 'Editar Coche';

    carMarca.value = '';
    carModelo.value = '';
    carTipo.value = '';
    carAnio.value = '';
    carPrecio.value = '';
    carImagenUrl.value = '';
    carImagenFile.value = null;
    carPreview.style.display = 'none';

    if (mode === 'edit' && editingIndex >= 0){
      const coches = JSON.parse(localStorage.getItem('coches')||'[]');
      const c = coches[editingIndex];
      if (c){
        carMarca.value = c.marca||'';
        carModelo.value = c.modelo||'';
        carTipo.value = c.tipo||'';
        carAnio.value = c.año||c.anio||'';
        carPrecio.value = c.precio||'';
        if (c.imagen){ carPreview.src = c.imagen; carPreview.style.display = ''; }
      }
    }

    modal.style.display = 'flex';
  }

  carImagenFile.addEventListener('change', function(){
    const f = this.files && this.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = function(e){ carPreview.src = e.target.result; carPreview.style.display = ''; };
    reader.readAsDataURL(f);
  });

  cancelCarBtn.addEventListener('click', ()=>{ modal.style.display = 'none'; editingIndex = -1; });
  // persistir coche en localStorage y notificar a otras pestañas
  function persistImageAndSave(carData, imgData, openAfter){
    const coches = JSON.parse(localStorage.getItem('coches')||'[]');
    const nuevo = Object.assign({}, carData, { imagen: imgData || carData.imagen || '' });
    if (editingIndex >= 0){
      coches[editingIndex] = Object.assign(coches[editingIndex]||{}, nuevo);
    } else {
      coches.push(nuevo);
    }
    localStorage.setItem('coches', JSON.stringify(coches));
    // Guardar la última unidad añadida para mostrar en Novedades cuando se abra el catálogo
    try{ localStorage.setItem('latest_added', JSON.stringify(nuevo)); }catch(e){}
    try{ localStorage.setItem('coches_last_update', Date.now().toString()); }catch(e){}
    if (bc) try{ bc.postMessage({ type: 'update' }); }catch(e){}
    modal.style.display = 'none';
    editingIndex = -1;
    loadCoches();
    if (openAfter) try{ window.open('pagina_coches.html','_blank'); }catch(e){}
  }

  function collectCarForm(){
    const marca = carMarca.value.trim();
    const modelo = carModelo.value.trim();
    const tipo = carTipo.value.trim();
    const anio = carAnio.value ? parseInt(carAnio.value,10) : undefined;
    const precio = carPrecio.value ? parseFloat(carPrecio.value) : undefined;
    const url = carImagenUrl.value.trim();
    return { marca, modelo, tipo, año: anio, precio, imagen: url };
  }

  saveCarBtn.addEventListener('click', function(){
    const carData = collectCarForm();
    if (!MARCAS_VALIDAS.includes(carData.marca)){
      alert("Marca inválida. Debe ser: " + MARCAS_VALIDAS.join(", "));
      return;
    }
    const f = carImagenFile.files && carImagenFile.files[0];
    if (f){
      const reader = new FileReader();
      reader.onload = function(e){ persistImageAndSave(carData, e.target.result, false); };
      reader.readAsDataURL(f);
    } else {
      persistImageAndSave(carData, null, false);
    }
  });

  // Botón 'Añadir y abrir catálogo'
  const addAndOpenBtn = document.getElementById('addAndOpenBtn');
  if (addAndOpenBtn){
    addAndOpenBtn.addEventListener('click', function(){
      const carData = collectCarForm();
      if (!MARCAS_VALIDAS.includes(carData.marca)){
        alert("Marca inválida. Debe ser: " + MARCAS_VALIDAS.join(", "));
        return;
      }
      const f = carImagenFile.files && carImagenFile.files[0];
      if (f){
        const reader = new FileReader();
        reader.onload = function(e){ persistImageAndSave(carData, e.target.result, true); };
        reader.readAsDataURL(f);
      } else {
        persistImageAndSave(carData, null, true);
      }
    });
  }

  // Inicializar
  loadUsuarios();
  loadCoches();

})();
