function validarFormulario() {
  const nombres = document.getElementById("nombres");
  const apellidos = document.getElementById("apellidos");
  const celular = document.getElementById("celular");
  const correo = document.getElementById("correo");
  const asunto = document.getElementById("asunto");
  const acepto = document.getElementById("acepto");

  // Limpiar errores previos
  document.getElementById("error-nombres").textContent = "";
  document.getElementById("error-apellidos").textContent = "";
  document.getElementById("error-celular").textContent = "";
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-asunto").textContent = "";
  document.getElementById("error-acepto").textContent = "";

  let valido = true;

  // Validar nombres
  const regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,60}$/;
  if (!regexLetras.test(nombres.value)) {
    document.getElementById("error-nombres").textContent = "Solo letras (máx. 60 caracteres)";
    valido = false;
  }

  // Validar apellidos
  if (!regexLetras.test(apellidos.value)) {
    document.getElementById("error-apellidos").textContent = "Solo letras (máx. 60 caracteres)";
    valido = false;
  }

  // Validar celular
  const regexCelular = /^[0-9]{9}$/;
  if (!regexCelular.test(celular.value)) {
    document.getElementById("error-celular").textContent = "Solo números (exactamente 9 dígitos)";
    valido = false;
  }

  // Validar correo
  if (correo.value.length > 60 || !correo.value.endsWith("@gmail.com")) {
    document.getElementById("error-correo").textContent = "Debe terminar en @gmail.com y máximo 60 caracteres";
    valido = false;
  }

  // Validar asunto
  if (asunto.value.length > 100) {
    document.getElementById("error-asunto").textContent = "Máximo 100 caracteres";
    valido = false;
  }

  // Validar aceptación de términos
  if (!acepto.checked) {
    document.getElementById("error-acepto").textContent = "Debes aceptar los términos y condiciones";
    valido = false;
  }

  // Si todo es válido, mostrar modal de éxito
  if (valido) {
    abrirModalExito();
    // Cierre automático en 5 segundos
    setTimeout(() => {
      cerrarModalExito();
    }, 5000);
  }

  return false; // Evita envío real, usamos modal + reset
}

// 🔹 Restricciones en tiempo real

// Nombres
document.getElementById("nombres").addEventListener("input", function() {
  const errorNombres = document.getElementById("error-nombres");
  if (/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/.test(this.value)) {
    errorNombres.textContent = "Solo letras";
  } else {
    errorNombres.textContent = "";
  }
  this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
  if (this.value.length > 60) this.value = this.value.slice(0, 60);
});

// Apellidos
document.getElementById("apellidos").addEventListener("input", function() {
  const errorApellidos = document.getElementById("error-apellidos");
  if (/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/.test(this.value)) {
    errorApellidos.textContent = "Solo letras";
  } else {
    errorApellidos.textContent = "";
  }
  this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
  if (this.value.length > 60) this.value = this.value.slice(0, 60);
});

// Celular
document.getElementById("celular").addEventListener("input", function() {
  const errorCelular = document.getElementById("error-celular");
  if (/[^0-9]/.test(this.value)) {
    errorCelular.textContent = "Solo números";
  } else {
    errorCelular.textContent = "";
  }
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value.length > 9) this.value = this.value.slice(0, 9);
});

// Correo
document.getElementById("correo").addEventListener("input", function() {
  const errorCorreo = document.getElementById("error-correo");
  if (this.value.length > 60) {
    errorCorreo.textContent = "Máximo 60 caracteres";
    this.value = this.value.slice(0, 60);
  } else if (!this.value.endsWith("@gmail.com") && this.value.length > 0) {
    errorCorreo.textContent = "Debe terminar en @gmail.com";
  } else {
    errorCorreo.textContent = "";
  }
});

// Asunto
document.getElementById("asunto").addEventListener("input", function() {
  const errorAsunto = document.getElementById("error-asunto");
  if (this.value.length > 100) {
    errorAsunto.textContent = "Máximo 100 caracteres";
    this.value = this.value.slice(0, 100);
  } else {
    errorAsunto.textContent = "";
  }
});

// 🔹 Modal de términos
function abrirModal() {
  document.getElementById("modal-terminos").style.display = "block";
}
function cerrarModal() {
  document.getElementById("modal-terminos").style.display = "none";
}

// 🔹 Modal de éxito
function abrirModalExito() {
  document.getElementById("modal-exito").style.display = "block";
}

function cerrarModalExito() {
  document.getElementById("modal-exito").style.display = "none";
  // Refrescar formulario al cerrar modal (manual o automático)
  document.querySelector(".form-contacto").reset();
}