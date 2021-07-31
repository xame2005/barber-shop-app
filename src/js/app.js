let pagina = 1;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarServicios();

  //Resalta el tab actual
  mostrarSeccion();

  //Oculta o muestra una sección según el tab que se presiona
  cambiarSeccion();

  //Paginacion siguiente y anterior
  paginaSiguiente();
  paginaAnterior();
}

function mostrarSeccion() {
  const seccionActual = document.querySelector(`#paso-${pagina}`);
  seccionActual.classList.add("mostrar-seccion");
  //Resalta el tab actual
  const tab = document.querySelector(`[data-paso="${pagina}"]`);
  tab.classList.add("actual");
}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll(".tabs button");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();

      pagina = parseInt(e.target.dataset.paso);

      //Elimina mostrar-seccion de la sección anterior
      document
        .querySelector(".mostrar-seccion")
        .classList.remove("mostrar-seccion");

      //Eliminar la clase .actual del tab anterior
      document.querySelector(".tabs .actual").classList.remove("actual");

      //Agregar la clase actual al nuevo tab
      const tab = document.querySelector(`[data-paso="${pagina}"]`);
      tab.classList.add("actual");

      const seccion = document.querySelector(`#paso-${pagina}`);
      seccion.classList.add("mostrar-seccion");

      // Llamar la función de mostrar sección
    });
  });
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

      //Selecciona un servicio para la cita
      servicioDiv.onclick = seleccionarServicio;

      //Inyectar Precio y Nombre al div de servicio
      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      //Inyectar en HTML
      document.querySelector("#servicios").appendChild(servicioDiv);
    });
  } catch (error) {}
}

function seleccionarServicio(e) {
  let elemento;
  //Obligar que el elemento al que se le da click sea una etiqueta <div></div>
  if (e.target.tagName === "P") {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
  }

  if (elemento.classList.contains("seleccionado")) {
    elemento.classList.remove("seleccionado");
  } else {
    elemento.classList.add("seleccionado");
  }
}

function paginaSiguiente() {
  document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", () => {
    pagina++;
  });
}

function paginaAnterior() {
  document.querySelector("#anterior");
  paginaSiguiente.addEventListener("click", () => {
    pagina--;
  });
}
