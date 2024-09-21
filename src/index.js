function setFavicon() {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const favicon = document.getElementById("favicon");

  // Cambia el icono según el modo de color
  if (darkModeMediaQuery.matches) {
    favicon.href = "/dosto-club-dark.svg"; // Icono para modo oscuro
  } else {
    favicon.href = "/dosto-club.svg"; // Icono para modo claro
  }
}

// Ejecuta la función al cargar la página
setFavicon();

// Detecta cambios en el tema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setFavicon);
