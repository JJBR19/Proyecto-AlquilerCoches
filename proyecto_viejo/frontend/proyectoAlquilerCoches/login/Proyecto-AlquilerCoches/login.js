  onload = () => {
    crearAdmin();
  };    
  
  function ocultar() {
    document.getElementById("mensaje-error").className = "escondido";
  }

  // Asegurar que exista una cuenta administrador por defecto
  function crearAdmin() {
   
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const existeAdmin = usuarios.some(u => u.role === 'admin' || u.usuario === 'admin');
      if (!existeAdmin) {
        usuarios.push({ nombre: 'Administrador', apellidos: 'admin', correo: 'admin@local.com', usuario: 'admin', contrasena: 'admin123', role: 'admin' });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }
    
  }

  function validar() {
    const codigo = document.getElementById("codigo").value.trim();
    const clave = document.getElementById("clave").value.trim();
    const mensaje = document.getElementById("mensaje-error");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      u => u.usuario === codigo && u.contrasena === clave
    );

    if (usuarioEncontrado) {
      alert("Bienvenido " + usuarioEncontrado.nombre);
      // Usar localStorage para mantener sesión entre pestañas y cierres
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
      // Redirigir a la página del menú para que el UI se actualice
      window.location.href = "../../menu/index.html";
    } else {
      mensaje.className = "mostrar";
    }
  }
