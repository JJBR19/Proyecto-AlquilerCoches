document.addEventListener('DOMContentLoaded', () => {
  const btnMenu = document.getElementById('btnMenu');
  const menuLinks = document.getElementById('menuLinks');
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutLink = document.getElementById('logoutLink');

  // Evento: abrir/cerrar menú en móviles
  btnMenu.addEventListener('click', () => {
    menuLinks.classList.toggle('show');
  });

  // Simulación de usuario logueado con localStorage
  const user = JSON.parse(localStorage.getItem('usuarioActual'));

  if (user) {
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
    logoutLink.style.display = 'block';
  } else {
    loginLink.style.display = 'block';
    registerLink.style.display = 'block';
    logoutLink.style.display = 'none';
  }

  // Evento: cerrar sesión
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioActual');
    alert('Sesión cerrada correctamente.');
    location.href = 'index.html';
  });

  // Extra: resalta la página actual
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('#menuLinks a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.style.color = '#ffd700';
      link.style.fontWeight = 'bold';
    }
  });
});
