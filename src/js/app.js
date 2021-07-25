document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarServicios();
}

async function mostrarServicios() {
  try {
    const resultado = await fetch("./servicios.json");
    const db = await resultado.json();

    const { servicios } = db;

    //Generando el HTML con JS con iteraciones.
    servicios.forEach((servicio) => {
      const { id, nombre, precio } = servicio;

      //DOM Scripting

      //Generar Nombre del Servicio
      const nombreServicio = document.createElement("P");
      nombreServicio.textContent = nombre;
      nombreServicio.classList.add("nombre-servicio");

      //Generar Precio del Servicio
      const precioServicio = document.createElement("P");
      precioServicio.textContent = `$${precio}`;
      precioServicio.classList.add("precio-servicio");

      //Generar div Contenedor de Servicio
      const servicioDiv = document.createElement("DIV");
      servicioDiv.classList.add("servicio");

      //Inyectar Precio y Nombre al div de servicio
      servicioDiv.appendChild(nombreServicio);

      //Inyectar en HTML
      document.querySelector("#servicios").appendChild(servicioDiv);
    });
  } catch (error) {}
}
