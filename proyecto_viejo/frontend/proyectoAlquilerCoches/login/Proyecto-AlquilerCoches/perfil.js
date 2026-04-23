document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("perfilDatos");
  const nombreHeading = document.getElementById("perfilNombre");
  const avatar = document.getElementById("avatar");

  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const originalIdentifier = { usuario: usuario?.usuario, correo: usuario?.correo || usuario?.email };

  if (!usuario) {
    cont.innerHTML = `<p>No hay sesión iniciada</p>
                      <p><a href="login.html">Iniciar sesión</a></p>`;
    nombreHeading.textContent = "Invitado";
    avatar.textContent = "I";
    return;
  }

  mostrarPerfil(usuario);

  // Botones
  document.getElementById("editarBtn")?.addEventListener("click", () => activarEdicion(true));
  document.getElementById("guardarBtn")?.addEventListener("click", guardarCambios);
  document.getElementById("cancelarBtn")?.addEventListener("click", () => {
    usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    mostrarPerfil(usuario);
    activarEdicion(false);
  });

  document.getElementById("btnCerrar")?.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    // después de cerrar sesión, volver al inicio
    window.location.href = '/proyectoAlquilerCoches/menu/index.html';
  });

  function mostrarPerfil(u) {
    nombreHeading.textContent = u.nombre || "Mi Perfil";
    avatar.textContent = (u.nombre?.charAt(0) || "U").toUpperCase();

    cont.innerHTML = `
      <div class="dato">
        <strong>Nombre:</strong>
        <input id="editNombre" value="${u.nombre}" disabled>
      </div>

      <div class="dato">
        <strong>Usuario:</strong>
        <input id="editUsuario" value="${u.usuario}" disabled>
      </div>

      <div class="dato">
        <strong>Email:</strong>
        <input id="editEmail" value="${u.email || u.correo || ''}" disabled>
      </div>
    `;
  }

  function activarEdicion(activar) {
    document.querySelectorAll("#perfilDatos input")
      .forEach(i => i.disabled = !activar);

    document.getElementById("formActions").style.display = activar ? "flex" : "none";
  }

  function guardarCambios() {
    usuario.nombre = document.getElementById("editNombre").value.trim();
    usuario.usuario = document.getElementById("editUsuario").value.trim();
    const nuevoEmail = document.getElementById("editEmail").value.trim();
    // Mantener compatibilidad: guardar tanto 'correo' como 'email'
    usuario.email = nuevoEmail;
    usuario.correo = nuevoEmail;

    // Guardar usuario activo
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Actualizar array de usuarios si existe
  
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const idx = usuarios.findIndex(x => x.usuario === originalIdentifier.usuario || x.correo === originalIdentifier.correo || x.email === originalIdentifier.correo);
      if (idx >= 0) {
        usuarios[idx] = Object.assign(usuarios[idx], usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }


    mostrarPerfil(usuario);
    activarEdicion(false);
  }
});
