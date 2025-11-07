

/*
 menu.js
   Menú reutilizable para todas las páginas.
   - Llamar Menu.init('#menu-container') en DOMContentLoaded
   - Cumple RA2-RA6: sintaxis ES6, objetos predefinidos, colecciones, eventos, DOM.
*/

/* Encapsulamos en un módulo simple para mantener el global limpio */

/*
const Menu = (function () {
  // -----------------------
  // Helpers y utilitarios
  // -----------------------
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24*60*60*1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
  }
  function getCookie(name) {
    return document.cookie.split('; ').reduce((acc, cur) => {
      const [k, v] = cur.split('=');
      return k === name ? decodeURIComponent(v) : acc;
    }, null);
  }

  function showToast(text, ms = 3000) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    // hide after ms
    setTimeout(() => toast.classList.remove('show'), ms);
  }

  // Generador simple de id (útil para RA4 luego)
  function generarId(prefix = 'id') {
    return `${prefix}_${Math.random().toString(36).slice(2,9)}`;
  }

  // -----------------------
  // Menú HTML (plantilla)
  // -----------------------
  const menuTemplate = () => `
    <div class="header-wrapper" role="banner">
      <nav class="navbar" role="navigation" aria-label="Menú principal">
        <div class="brand">
          <div class="logo-badge">RD</div>
          <div class="brand-text">RentDrive</div>
        </div>

        <ul id="menuLinks" class="menu-links" role="menubar">
          <li role="none"><a role="menuitem" href="index.html" class="active">Inicio</a></li>
          <li role="none"><a role="menuitem" href="catalogo.html">Catálogo</a></li>
          <li role="none"><a role="menuitem" href="gestion_coches.html">Gestión</a></li>
          <li role="none"><a role="menuitem" href="alquiler_form.html">Reservas</a></li>
          <li role="none"><a role="menuitem" href="historial.html">Historial</a></li>
        </ul>

        <div class="controls">
          <div class="header-clock" id="header-clock" aria-live="polite">--:--:--</div>
          <button id="btnLogin" class="btn btn-ghost">Login</button>
          <button id="btnProfile" class="btn btn-primary" style="display:none">Mi cuenta</button>
          <button id="btnToggle" class="menu-toggle" aria-label="Abrir menú">☰</button>
        </div>
      </nav>
    </div>
  `;

  // -----------------------
  // Estado local (simulado)
  // -----------------------
  const state = {
    user: null // {id,name,email}
  };

  // Simula carga inicial (RA4 - carga inicial de objetos): guardamos un array de coches en localStorage si no existe
  function cargarSeed() {
    const existe = localStorage.getItem('coches_seed_loaded');
    if (existe) return;
    const coches = [
      { id: generarId('car'), marca: 'Toyota', modelo: 'Corolla', matricula: '1234ABC', categoria: 'compacto', precioDia: 30, estado: 'disponible' },
      { id: generarId('car'), marca: 'BMW', modelo: 'Serie 3', matricula: '5678DEF', categoria: 'deportivo', precioDia: 85, estado: 'disponible' },
      { id: generarId('car'), marca: 'Mercedes', modelo: 'Clase C', matricula: '9012GHI', categoria: 'lujo', precioDia: 120, estado: 'disponible' }
    ];
    localStorage.setItem('coches', JSON.stringify(coches));
    localStorage.setItem('coches_seed_loaded', '1');
  }

  // -----------------------
  // Inicialización y eventos
  // -----------------------
  async function init(containerSelector = 'body') {
    // carga datos iniciales (simulación)
    cargarSeed();

    // renderiza menú
    const container = document.querySelector(containerSelector);
    if (!container) throw new Error('No se encontró el contenedor para el menú: ' + containerSelector);
    container.innerHTML = menuTemplate();

    // bind elements
    const btnToggle = document.getElementById('btnToggle');
    const menuLinks = document.getElementById('menuLinks');
    const btnLogin = document.getElementById('btnLogin');
    const btnProfile = document.getElementById('btnProfile');
    const headerClock = document.getElementById('header-clock');

    // Mostrar estado de sesión si existe usuario guardado (localStorage)
    const savedUser = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    if (savedUser) {
      state.user = savedUser;
      btnLogin.style.display = 'none';
      btnProfile.style.display = 'inline-flex';
      showToast(`Bienvenido de nuevo, ${state.user.name}`, 2500);
    }

    // Evento: toggle menú (click) - muestra/oculta en móvil
    btnToggle.addEventListener('click', () => {
      menuLinks.classList.toggle('show');
    });

    // Evento: login (aquí simulamos: abre prompt y guarda en localStorage) -> DEMO para RA5 eventos & forms
    btnLogin.addEventListener('click', () => {
      // usamos prompt solo para demo; en entrega real será una página con formulario validado
      const email = prompt('Email (demo):');
      const nombre = prompt('Nombre (demo):');
      if (email && nombre) {
        const user = { id: generarId('user'), name: nombre.trim(), email: email.trim(), created: new Date().toISOString() };
        localStorage.setItem('usuarioActual', JSON.stringify(user)); // RA3: uso de localStorage y JSON
        setCookie('session_user', user.id, 1); // RA3: uso de cookie
        state.user = user;
        btnLogin.style.display = 'none';
        btnProfile.style.display = 'inline-flex';
        showToast(`Hola ${user.name} — sesión iniciada`, 3000);
        // ejemplo setTimeout: redirigir (simulado) tras 1.5s
        setTimeout(() => {
          // location.href = 'index.html';
          console.log('Simulación de redirección tras login (1.5s)');
        }, 1500);
      } else {
        showToast('Login cancelado', 1500);
      }
    });

    // Perfil / cerrar sesión: al hacer click abre opciones
    btnProfile.addEventListener('click', () => {
      // demostración de manipulación del DOM (RA6)
      const menu = document.createElement('div');
      menu.style.position = 'absolute';
      menu.style.right = '16px';
      menu.style.top = '64px';
      menu.style.background = '#081726';
      menu.style.padding = '8px';
      menu.style.borderRadius = '8px';
      menu.style.boxShadow = '0 6px 18px rgba(0,0,0,.5)';
      menu.innerHTML = `
        <div style="padding:.25rem .5rem; color:#fff">Conectado: <strong>${state.user.name}</strong></div>
        <button id="btnCerrar" class="btn btn-ghost" style="display:block; margin:.5rem;">Cerrar sesión</button>
      `;
      document.body.appendChild(menu);

      // delegación de eventos: escucha un click en body para cerrar el menú contextual
      const cerrar = () => { menu.remove(); document.removeEventListener('click', cerrar); };
      setTimeout(() => document.addEventListener('click', cerrar), 0);

      qs('#btnCerrar', menu).addEventListener('click', (ev) => {
        ev.stopPropagation();
        localStorage.removeItem('usuarioActual');
        state.user = null;
        setCookie('session_user', '', -1);
        btnLogin.style.display = 'inline-flex';
        btnProfile.style.display = 'none';
        showToast('Sesión cerrada', 1800);
        menu.remove();
      });
    });

    // Evento global: delegación para enlaces del menú (ej: analytics o prevención)
    menuLinks.addEventListener('click', (ev) => {
      const a = ev.target.closest('a');
      if (!a) return;
      // ejemplo: si clic en "Reservas" y no hay usuario, avisar
      if (a.getAttribute('href').includes('alquiler_form') && !state.user) {
        ev.preventDefault();
        showToast('Inicia sesión antes de reservar', 2000);
      }
    });

    // Evento: atajo de teclado para abrir menú (keypress/keydown) -> RA5 keypress
    document.addEventListener('keydown', (e) => {
      // Alt + m para abrir/cerrar menú en móviles (demo)
      if (e.altKey && e.key.toLowerCase() === 'm') {
        menuLinks.classList.toggle('show');
        showToast('Toggle menú (Alt+M)', 1000);
      }
    });

    // setInterval: actualiza reloj cada segundo (ejemplo RA3 con Date)
    function actualizarReloj() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2,'0');
      const mm = String(now.getMinutes()).padStart(2,'0');
      const ss = String(now.getSeconds()).padStart(2,'0');
      headerClock.textContent = `${hh}:${mm}:${ss}`;
    }
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    // ejemplo de uso de Array y JSON: cargar lista de coches desde localStorage
    const cochesRaw = localStorage.getItem('coches');
    if (cochesRaw) {
      try {
        const coches = JSON.parse(cochesRaw); // RA3: JSON
        // ejemplo RA4: filtrar rápido por categoria (demostración)
        const compactos = coches.filter(c => c.categoria === 'compacto' || c.categoria === 'compacto');
        console.log('Coches total:', coches.length, 'Compactos encontrados:', compactos.length);
      } catch (err) {
        console.error('Error parseando coches en localStorage', err);
      }
    }

    // Fin init
    return true;
  }

  // Exponer API mínima
  return { init, _helpers: { qs, qsa, generarId } };
})();
*/