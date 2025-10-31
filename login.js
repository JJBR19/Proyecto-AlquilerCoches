function validar() {
  let codigo = document.getElementById("codigo").value;
  let clave = document.getElementById("clave").value;

  let posicion = listaUsuarios.findIndex(
    (u) => u.codigo_usuario == codigo && u.clave == clave
  );
  if (posicion != -1) {
    location.href = "./aterrizaje.html";
  } else {
    document.getElementById("errorCodigoClave").className = "visible";
  }
}
function ocultar() {
  document.getElementById("errorCodigoClave").className = "oculto";
}
