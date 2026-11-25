
/* ==========================================
   VIBE ABUNDANTE
   JAVASCRIPT - PROYECTO ACADÉMICO
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* ==========================================
     1. MENÚ HAMBURGUESA RESPONSIVE
     ========================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  function cerrarMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const abierto = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(abierto));
      menuToggle.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
      );
      menuToggle.textContent = abierto ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(enlace => {
      enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("click", evento => {
      if (
        !navLinks.contains(evento.target) &&
        !menuToggle.contains(evento.target)
      ) {
        cerrarMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) cerrarMenu();
    });
  }


  
/* ==========================================
   2. CARRUSEL AUTOMÁTICO
   ========================================== */

const slides = Array.from(
  document.querySelectorAll('input[name="hero-slider"]')
);

let intervaloCarrusel = null;

function siguienteSlide() {
  if (slides.length < 2) return;

  const indiceActual = slides.findIndex(
    slide => slide.checked
  );

  const siguienteIndice =
    (indiceActual + 1) % slides.length;

  slides[siguienteIndice].checked = true;
}

function iniciarCarrusel() {
  clearInterval(intervaloCarrusel);

  intervaloCarrusel = setInterval(
    siguienteSlide,
    3000
  );
}

if (slides.length > 1) {

  iniciarCarrusel();

  slides.forEach(slide => {
    slide.addEventListener("change", iniciarCarrusel);
  });

}


  /* ==========================================
     3. CATÁLOGO DE PRODUCTOS
     ========================================== */

  const productos = [
    {
      id: 0,
      nombre: "Cargo Parachute Oversize",
      precio: 129.00,
      imagen:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 1,
      nombre: "Crop Top Confianza Pink",
      precio: 69.00,
      imagen:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      nombre: "Bomber Jacket Éxito",
      precio: 159.00,
      imagen:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
    }
  ];


  /* ==========================================
     4. ELEMENTOS DEL CARRITO
     ========================================== */

  const botonCarrito = document.querySelector(".btn-cart-trigger");
  const panelCarrito = document.querySelector(".cart-drawer");
  const overlayCarrito = document.querySelector(".cart-overlay");
  const botonCerrarCarrito = document.querySelector(".close-cart");

  const contenedorProductos = document.querySelector(".cart-items");
  const contadorCarrito = document.querySelector(".cart-badge");
  const totalCarrito = document.querySelector(".cart-total strong");
  const botonFinalizar = document.querySelector(".cart-checkout-btn");

  const botonesAgregar = document.querySelectorAll(".btn-add");

  const carrito = [];

  let ultimoFoco = null;


  /* ==========================================
     5. FORMATO DE PRECIOS EN SOLES
     ========================================== */

  function formatoPrecio(cantidad) {
    return `S/ ${cantidad.toFixed(2)}`;
  }


  /* ==========================================
     6. ABRIR Y CERRAR CARRITO
     ========================================== */

  function abrirCarrito() {
    if (!panelCarrito || !overlayCarrito) return;

    ultimoFoco = document.activeElement;

    cerrarMenu();

    panelCarrito.classList.add("is-open");
    overlayCarrito.classList.add("is-open");

    panelCarrito.setAttribute("aria-hidden", "false");
    botonCarrito?.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";

    botonCerrarCarrito?.focus();
  }

  function cerrarCarrito() {
    if (!panelCarrito || !overlayCarrito) return;

    panelCarrito.classList.remove("is-open");
    overlayCarrito.classList.remove("is-open");

    panelCarrito.setAttribute("aria-hidden", "true");
    botonCarrito?.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";

    if (ultimoFoco && typeof ultimoFoco.focus === "function") {
      ultimoFoco.focus();
    }
  }

  botonCarrito?.addEventListener("click", abrirCarrito);
  botonCerrarCarrito?.addEventListener("click", cerrarCarrito);
  overlayCarrito?.addEventListener("click", cerrarCarrito);


  /* ==========================================
     7. ACTUALIZAR CARRITO
     ========================================== */

  function actualizarCarrito() {
    if (
      !contenedorProductos ||
      !contadorCarrito ||
      !totalCarrito
    ) {
      return;
    }

    contenedorProductos.innerHTML = "";

    let cantidadTotal = 0;
    let precioTotal = 0;

    carrito.forEach(item => {
      cantidadTotal += item.cantidad;
      precioTotal += item.precio * item.cantidad;
    });

    contadorCarrito.textContent = cantidadTotal;
    totalCarrito.textContent = formatoPrecio(precioTotal);

if (carrito.length === 0) {
  const mensaje = document.createElement("p");
  mensaje.className = "cart-empty";
  mensaje.textContent =
    "Tu bolsa está vacía. ¡Elige tu primera prenda!";

  contenedorProductos.appendChild(mensaje);
  return;
}

    carrito.forEach(item => {

      const elemento = document.createElement("article");
      elemento.className = "cart-item";

      const imagen = document.createElement("img");
      imagen.src = item.imagen;
      imagen.alt = item.nombre;
      imagen.width = 72;
      imagen.height = 72;

      const detalles = document.createElement("div");
      detalles.className = "cart-item-details";

      const nombre = document.createElement("h4");
      nombre.textContent = item.nombre;

      const precio = document.createElement("p");
      precio.className = "cart-price";
      precio.textContent = formatoPrecio(item.precio);

      const cantidad = document.createElement("p");
      cantidad.className = "cart-qty";
      cantidad.textContent = `Cantidad: ${item.cantidad}`;

      const controles = document.createElement("div");
      controles.className = "cart-qty-controls";

      function crearBoton(texto, accion, etiqueta) {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.textContent = texto;
        boton.dataset.action = accion;
        boton.dataset.id = String(item.id);
        boton.setAttribute("aria-label", etiqueta);

        if (accion === "remove") {
          boton.className = "remove-item";
        } else {
          boton.className = "qty-btn";
        }

        return boton;
      }

      const disminuir = crearBoton(
        "−",
        "decrease",
        `Disminuir cantidad de ${item.nombre}`
      );

      const aumentar = crearBoton(
        "+",
        "increase",
        `Aumentar cantidad de ${item.nombre}`
      );

      const eliminar = crearBoton(
        "✕",
        "remove",
        `Eliminar ${item.nombre}`
      );

      const numero = document.createElement("span");
      numero.textContent = item.cantidad;

      controles.append(
        disminuir,
        numero,
        aumentar,
        eliminar
      );

      detalles.append(
        nombre,
        precio,
        cantidad,
        controles
      );

      elemento.append(imagen, detalles);
      contenedorProductos.appendChild(elemento);
    });
  }


  /* ==========================================
     8. AGREGAR PRODUCTOS
     ========================================== */

  function agregarProducto(id) {
    const producto = productos.find(item => item.id === id);

    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        ...producto,
        cantidad: 1
      });
    }

    actualizarCarrito();
    abrirCarrito();
  }

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.productId);
      agregarProducto(id);
    });
  });


  /* ==========================================
     9. MODIFICAR CANTIDADES
     ========================================== */

  contenedorProductos?.addEventListener("click", evento => {
    const boton = evento.target.closest("button[data-action]");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.action;

    const indice = carrito.findIndex(item => item.id === id);

    if (indice === -1) return;

    if (accion === "increase") {
      carrito[indice].cantidad++;
    }

    if (accion === "decrease") {
      carrito[indice].cantidad--;

      if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
      }
    }

    if (accion === "remove") {
      carrito.splice(indice, 1);
    }

    actualizarCarrito();
  });


  /* ==========================================
     10. FINALIZAR COMPRA DEMOSTRATIVA
     ========================================== */

  botonFinalizar?.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert(
        "Tu bolsín está vacía. Agrega una prenda para continuar."
      );
      return;
    }

    alert(
      "¡Gracias por elegir VIBE ABUNDANTE!\n\n" +
      "Este carrito es una demostración académica.\n" +
      "No se realizará ningún cobro ni pedido."
    );
  });


  /* ==========================================
     11. FORMULARIO COMUNIDAD VIP
     ========================================== */

  const formularioVIP = document.querySelector("#form-vip");
  const campoCorreo = document.querySelector("#vip-email");
  const mensajeVIP = document.querySelector(".vip-feedback");

  if (formularioVIP && campoCorreo && mensajeVIP) {

    formularioVIP.addEventListener("submit", evento => {
      evento.preventDefault();

      if (!campoCorreo.checkValidity()) {
        campoCorreo.reportValidity();
        return;
      }

      mensajeVIP.textContent =
        "¡Gracias por tu interés en VIBE ABUNDANTE! " +
        "Este formulario es demostrativo y no guarda tus datos.";

      formularioVIP.reset();
    });
  }


  /* ==========================================
     12. ACCESIBILIDAD CON TECLADO
     ========================================== */

  document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {

      if (panelCarrito?.classList.contains("is-open")) {
        cerrarCarrito();
      }

      cerrarMenu();
    }

    if (
      evento.key === "Tab" &&
      panelCarrito?.classList.contains("is-open")
    ) {

      const elementos = Array.from(
        panelCarrito.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled])'
        )
      ).filter(elemento => elemento.getClientRects().length > 0);

      if (elementos.length === 0) return;

      const primero = elementos[0];
      const ultimo = elementos[elementos.length - 1];

      if (
        evento.shiftKey &&
        document.activeElement === primero
      ) {
        evento.preventDefault();
        ultimo.focus();
      } else if (
        !evento.shiftKey &&
        document.activeElement === ultimo
      ) {
        evento.preventDefault();
        primero.focus();
      }
    }
  });


  /* ==========================================
     13. INICIALIZACIÓN
     ========================================== */

  actualizarCarrito();

});
