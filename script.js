function mostrarIngreso() {
  document.getElementById('loginForm').style.display = 'flex';
  document.getElementById('registroForm').style.display = 'none';
}

function mostrarRegistro() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registroForm').style.display = 'flex';
}



document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let email = document.getElementById('email').value.trim();
    let usuario = document.getElementById('usuario').value.trim();
    let password = document.getElementById('password').value.trim();
    let check1 = document.getElementById('check1').checked;
    let check2 = document.getElementById('check2').checked;
    let check3 = document.getElementById('check3').checked;
  
    if (nombre === '' || apellido === '' || email === '' || usuario === '' || password === '' || (!check1 && !check2 && !check3)) {
      alert('Por favor, complete todos los campos y seleccione al menos una opción.');
      return;
    }
  
    // Aquí agregar el código para enviar los datos al backend
    alert('¡Registro exitoso!');
  });
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('emailLogin').value.trim();
    let usuario = document.getElementById('usuarioLogin').value.trim();
    let password = document.getElementById('passwordLogin').value.trim();
  
    if (email === '' || usuario === '' || password === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    // Aquí agregar el código para enviar los datos al backend
    window.location.href = "./inicio.html";
    // alert('¡Inicio de sesión exitoso!');
  });
  