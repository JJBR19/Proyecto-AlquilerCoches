class MenuComponente extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = this.template;
    // Actualizar UI de autenticación antes de activar eventos para
    // que los elementos dinámicos (logout) existan cuando añadimos handlers.
    this.updateAuthUI();
    this.activarEventos();
  }

  get template() {
    return `
            
    <header>
    <div class="header-container">
      <div class="logo">🚗 Alquiler de Coches</div>
      <nav id="menu">
        <ul id="menuLinks">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="catalogo.html">Catálogo</a></li>
          <li><a href="gestion_coches.html">Alquiler Coches</a></li>
          <li id="logoutLink" style="display:none"><a href="#">Cerrar sesión</a></li>
        </ul>
        <button id="btnMenu" class="menu-toggle">☰</button>
      </nav>
      <div class="auth-links">
        <div class="auth-logo"><img src="https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png" alt="logoLogin"></div>
        <ul>
          <li id="loginLink"><a href="login.html">Login</a></li>
          <li id="registerLink"><a href="register.html">Registro</a></li>
        </ul>
      </div>
    </div>
    </header>
        `;
    }

    activarEventos() {
        const menuLinks = this.querySelector("#menuLinks");
        const btnMenu = this.querySelector("#btnMenu");

        if (!btnMenu || !menuLinks) return;

      btnMenu.addEventListener("click", () => {
      menuLinks.classList.toggle("active");
      });
      // manejador de cierre de sesión (si se crea en updateAuthUI)
      const logoutBtn = this.querySelector("#logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // usar localStorage para persistencia
          localStorage.removeItem("usuarioActivo");
          // redirigir al inicio del sitio
          window.location.href = '/proyectoAlquilerCoches/menu/index.html';
        });
      }
    }

    updateAuthUI() {
      try {
        // Usar localStorage para persistencia entre pestañas
        const usuarioJson = localStorage.getItem("usuarioActivo");
        const loginLink = this.querySelector("#loginLink");
        const registerLink = this.querySelector("#registerLink");
        const authContainer = this.querySelector(".auth-links");

        if (usuarioJson) {
          const usuario = JSON.parse(usuarioJson);
          // ocultar enlaces de acceso/registro
          if (loginLink) loginLink.style.display = "none";
          if (registerLink) registerLink.style.display = "none";

          // mostrar nombre de usuario y botón de cerrar sesión
          if (authContainer) {
            // ruta al perfil relativa desde la carpeta `menu`.
            const perfilHref = "../login/Proyecto-AlquilerCoches/perfil.html";
            authContainer.innerHTML = `
              <div class="auth-logo"><img src="https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png" alt="logoLogin"></div>
              <ul>
                <li class="user-name"><a href="${perfilHref}">${usuario.nombre}</a></li>
                <li><a href="#" id="logoutBtn">Cerrar sesión</a></li>
              </ul>
            `;
          }
        } else {
          // usuario no logueado: asegurar que login/register estén visibles
          if (loginLink) loginLink.style.display = "";
          if (registerLink) registerLink.style.display = "";
        }
      } catch (err) {
        console.error('Error actualizando UI de autenticación', err);
      }
    }
}
export let etiquetaMenu = window.customElements.define("menu-componente", MenuComponente);