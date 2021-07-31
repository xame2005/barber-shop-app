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

  //Comprobar la página actual para ocultar o mostrar los botones de paginación
  botonesPaginador();
}

function mostrarSeccion() {
  // Eliminar mostrar-seccion de la sección anterior
  const seccionAnterior = document.querySelector(".mostrar-seccion");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar-seccion");
  }

  const seccionActual = document.querySelector(`#paso-${pagina}`);
  seccionActual.classList.add("mostrar-seccion");

  // Eliminar la clase de actual en el tab anterior
  const tabAnterior = document.querySelector(".tabs .actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  // Resalta el Tab Actual
  const tab = document.querySelector(`[data-paso="${pagina}"]`);
  tab.classList.add("actual");
}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll(".tabs button");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();

      pagina = parseInt(e.target.dataset.paso);

      // Llamar la función de mostrar sección
      mostrarSeccion();
      botonesPaginador();
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
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", () => {
    pagina++;
    botonesPaginador();
  });
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", () => {
    pagina--;

    botonesPaginador();
  });
}

function botonesPaginador() {
  const paginaSiguiente = document.querySelector("#siguiente");
  const paginaAnterior = document.querySelector("#anterior");

  if (pagina === 1) {
    paginaAnterior.classList.add("ocultar");
  } else if (pagina === 3) {
    paginaSiguiente.classList.add("ocultar");
    paginaAnterior.classList.remove("ocultar");

    mostrarResumen(); // Estamos en la página 3, carga el resumen de la cita
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion(); // Cambia la sección que se muestra por la de la página
}
