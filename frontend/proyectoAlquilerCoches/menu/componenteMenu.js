class MenuComponente extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Inyectar template + estilos en el shadow DOM para aislarlos del CSS de la página
    this._shadow.innerHTML = `<style>
      /* Estilos del menú encapsulados (copiados y reducidos desde menu.css) */
      :host { display: block; }
      header { background: linear-gradient(90deg, #001f3f, #003366, #0055aa); position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
      .header-container { width: 90%; max-width: 1300px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 3rem; gap: 4rem; }
      .logo { margin: 0; font-size: 1.5rem; font-weight: bold; color: #ffd700; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(255,215,0,0.5); white-space: nowrap; }
      .auth-links { display: flex; align-items: center; gap: 0.8rem; background-color: rgba(255,215,0,0.06); padding: 0.3rem 0.8rem; border-radius: 20px; flex-shrink: 0; }
      .auth-links .auth-logo { font-size: 1.6rem; }
      .auth-links ul { display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0; }
      .auth-links ul li a { text-decoration: none; color: #ffd700; font-weight: 700; transition: color 0.3s ease; }
      .auth-links ul li a:hover { color: #e6c200; text-decoration: underline; }
      .auth-logo img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid #ffd700; box-shadow: 0 0 5px rgba(255,215,0,0.6); cursor: pointer; }
      #menu { display: flex; align-items: center; justify-content: center; flex: 1; }
      #menuLinks { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 10px; }
      #menuLinks li a { color: white; text-decoration: none; font-size: 1.1rem; font-weight: 600; padding: 0.6rem 1rem; border-radius: 10px; transition: all 0.3s ease; white-space: nowrap; }
      #menuLinks li a:hover { background-color: #ffd700; color: #002b5c; box-shadow: 0 0 10px #ffd700; }
      .menu-toggle { display: none; background: none; border: 2px solid white; border-radius: 8px; padding: 0.5rem 0.8rem; color: white; font-size: 1.5rem; cursor: pointer; transition: all 0.3s ease; }
      .menu-toggle:hover { background-color: #ffd700; color: #001f3f; }
      @media (max-width: 900px) {
        .header-container { flex-direction: column; align-items: flex-start; }
        #menuLinks { display: none; flex-direction: column; background-color: rgba(0,31,63,0.95); width: 100%; margin-top: 1rem; padding: 1rem 0; border-top: 2px solid #ffd700; }
        #menuLinks.active { display: flex; }
        .menu-toggle { display: block; align-self: flex-end; }
        .logo { font-size: 1.8rem; margin-bottom: 0.5rem; }
      }
    </style>` + this.template;

    // Ahora el DOM está en shadowRoot: actualizar y configurar eventos
    this.actualizarUIAuth();
    this.activarEventos();
    // Fijar el header en la parte superior y añadir placeholder para empujar contenido
    this.fijarCabeceraYPlaceholder();
  }

  get template() {
    return `
    <header>
      <div class="header-container">
        <div class="logo">🚗 Alquiler de Coches</div>
        <nav id="menu">
          <ul id="menuLinks">
            <li><a href="/proyectoAlquilerCoches/menu/index.html">Inicio</a></li>
            <li><a href="/proyectoAlquilerCoches/GestionCoches/GestionCoches.html">Gestión Coches</a></li>
            <li><a href="/proyectoAlquilerCoches/login/Proyecto-AlquilerCoches/pagina_coches.html">Catálogo</a></li>
            <li id="adminLink" style="display:none">
            <a href="/proyectoAlquilerCoches/login/Proyecto-AlquilerCoches/admin.html">Admin</a>
            </li>
          </ul>
          <button id="btnMenu" class="menu-toggle">☰</button>
        </nav>
        <div class="auth-links">
          <div class="auth-logo"><img src="https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png" alt="logoLogin"></div>
          <ul>
            <li id="loginLink"><a href="/proyectoAlquilerCoches/login/Proyecto-AlquilerCoches/login.html">Login</a></li>
            <li id="registerLink"><a href="/proyectoAlquilerCoches/login/Proyecto-AlquilerCoches/registro.html">Registro</a></li>
          </ul>
        </div>
      </div>
    </header>`;
  }

  activarEventos() {
    const menuLinks = this._shadow.querySelector('#menuLinks');
    const btnMenu = this._shadow.querySelector('#btnMenu');

    if (btnMenu && menuLinks) {
      btnMenu.addEventListener('click', () => {
        menuLinks.classList.toggle('active');
      });
    }

    // Manejador de cierre de sesión: puede crearse dinámicamente en actualizarUIAuth
    const logoutBtn = this._shadow.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioActivo');
        // Al cerrar sesión, dirigir al inicio del sitio
        window.location.href = '/proyectoAlquilerCoches/menu/index.html';
      });
    }
    // cuando el menú responsive cambia (toggle), actualizar placeholder
    const toggle = this._shadow.querySelector('#btnMenu');
    if (toggle) {
        toggle.addEventListener('click', () => {
        // permitir que el DOM se actualice primero
        requestAnimationFrame(() => this.actualizarAlturaPlaceholder());
      });
    }
  }

  actualizarUIAuth() {
    try {
      const usuarioJson = localStorage.getItem('usuarioActivo');
      const loginLink = this._shadow.querySelector('#loginLink');
      const registerLink = this._shadow.querySelector('#registerLink');
      const authContainer = this._shadow.querySelector('.auth-links');

      if (usuarioJson) {
        const usuario = JSON.parse(usuarioJson);
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';

        if (authContainer) {
          const perfilHref = '/proyectoAlquilerCoches/login/Proyecto-AlquilerCoches/perfil.html';
          const reservasHref = '/proyectoAlquilerCoches/login/Proyecto-AlquilerCoches/reservas.html';
          authContainer.innerHTML = `
            <div class="auth-logo"><img src="https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png" alt="logoLogin"></div>
            <ul>
              <li class="user-name"><a href="${perfilHref}">${usuario.nombre || usuario.usuario || 'Perfil'}</a></li>
              <li><a href="${reservasHref}">Reservas</a></li>
              <li><a href="#" id="logoutBtn">Cerrar sesión</a></li>
            </ul>`;
        }
        // Mostrar enlace admin si el usuario es admin
        const adminLink = this._shadow.querySelector('#adminLink');
        if (adminLink) {
          if (usuario.role === 'admin' || usuario.usuario === 'admin') adminLink.style.display = '';
          else adminLink.style.display = 'none';
        }
      } else {
        if (loginLink) loginLink.style.display = '';
        if (registerLink) registerLink.style.display = '';
      }
    } catch (err) {
      console.error('Error en actualizarUIAuth:', err);
    }
  }

  fijarCabeceraYPlaceholder() {
    // aplicar estilo fixed al header dentro del shadow DOM
    const header = this._shadow.querySelector('header');
    if (!header) return;
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.width = '100%';
    header.style.zIndex = '2000';

    // crear placeholder en light DOM inmediatamente después del componente
    if (!this._placeholder) {
      this._placeholder = document.createElement('div');
      this._placeholder.setAttribute('aria-hidden', 'true');
      this.after(this._placeholder);
    }

    // medir y asignar altura
    this.actualizarAlturaPlaceholder();

    // actualizar en resize
    this._resizeHandler = () => this.actualizarAlturaPlaceholder();
    window.addEventListener('resize', this._resizeHandler);
  }

  actualizarAlturaPlaceholder() {
    const header = this._shadow.querySelector('header');
    if (!header || !this._placeholder) return;
    // fuerza reflow para obtener tamaño actual
    const h = header.getBoundingClientRect().height;
    this._placeholder.style.height = h + 'px';
  }

  disconnectedCallback() {
    if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
    if (this._placeholder && this._placeholder.parentNode) this._placeholder.parentNode.removeChild(this._placeholder);
  }
}

export let etiquetaMenu = window.customElements.define('menu-componente', MenuComponente);