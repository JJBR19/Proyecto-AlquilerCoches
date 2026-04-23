function validarRegistro() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  const mensaje = document.getElementById("mensaje-error");

  // Validar campos vacíos
  if (!nombre || !apellidos || !correo || !usuario || !contrasena) {
    mensaje.textContent = "Por favor, completa todos los campos.";
    mensaje.className = "mostrar";
    return;
  }

  // Validar formato correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    mensaje.textContent = "El correo electrónico no es válido.";
    mensaje.className = "mostrar";
    return;
  }

  // Validar usuario sin espacios
  if (usuario.includes(" ")) {
    mensaje.textContent = "El usuario no puede tener espacios.";
    mensaje.className = "mostrar";
    return;
  }

  // Validar contraseña mínima
  if (contrasena.length < 6) {
    mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
    mensaje.className = "mostrar";
    return;
  }
  
  // Obtener usuarios del localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  // Validar que no exista el usuario
  if (usuarios.some(u => u.usuario === usuario)) {
    mensaje.textContent = "El usuario ya existe, elige otro.";
    mensaje.className = "mostrar";
    return;
  }
  // Por defecto el rol es 'user'
  usuarios.push({ nombre, apellidos, correo, usuario, contrasena, role: 'user' });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  mensaje.className = "escondido";
  alert("Registro completado correctamente ✅");
  window.location.href = "login.html";
}

function ocultar() {
  document.getElementById("mensaje-error").className = "escondido";
}