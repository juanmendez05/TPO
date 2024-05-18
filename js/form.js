// Función para validar y mostrar mensaje pop-up al enviar el formulario
function validarFormulario() {
  // Obtener los valores de los campos del formulario
  var email = document.getElementById('email').value;
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var telefono = document.getElementById('telefono').value;
  var mensaje = document.getElementById('mensaje').value;
  var motivo = document.getElementById('motivo').value;
  var terminos = document.getElementById('terminos').checked;

  // Verificar si algún campo está vacío
  if (!email || !nombre || !apellido || !telefono || !mensaje || !motivo || !terminos) {
    // Mostrar mensaje de error
    swal.fire({
      title: 'Error!',
      text: 'No se ha completado un campo o se ha ingresado un valor inválido',
      icon: "error",
      width: '330px'
    });

    return false; // Evitar el envío del formulario
  }

  // Crear el mensaje con los valores obtenidos
  var mensajeCompleto = "Email: " + email + "\n";
  mensajeCompleto += "Nombre: " + nombre + "\n";
  mensajeCompleto += "Apellido: " + apellido + "\n";
  mensajeCompleto += "Teléfono: " + telefono + "\n";
  mensajeCompleto += "Motivo: " + motivo + "\n";
  mensajeCompleto += "Mensaje: " + mensaje;

  // Mostrar el mensaje en una ventana emergente
  alert('Mensaje Enviado según los siguiente datos:\n\n'+mensajeCompleto);

  return true; // Permitir el envío del formulario si todos los campos están completos
}