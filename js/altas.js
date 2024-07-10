//const URL = "http://127.0.0.1:5000/"
//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
const URL = "https://juanmendez.pythonanywhere.com/"

// Capturamos el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se envie el form
    
    var formData = new FormData(this);

    // Realizamos la solicitud POST al servidor
    fetch(URL + 'alumnos', {
        method: 'POST',
        body: formData // Aquí enviamos formData. Dado que formData puede contener archivos, no se utiliza JSON.
    })

    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) {
        //Si la respuesta es exitosa, convierte los datos de la respuesta a formato JSON.
            return response.json();
        } else {
        // Si hubo un error, lanzar explícitamente una excepción
        // para ser "catcheada" más adelante
            throw new Error('Error al agregar el alumno.');
        }
    })

    //Respuesta OK, muestra una alerta informando que el alumno se agregó correctamente y limpia los campos del formulario para que puedan ser utilizados para un nuevo alumno.
    .then(function (data) {
        alert('Alumno agregado correctamente.');
    })
    
    // En caso de error, mostramos una alerta con un mensaje de error.
    .catch(function (error) {
        alert('Error al agregar el alumno.');
    })

    // Limpiar el formulario en ambos casos (éxito o error)
    .finally(function () {
        document.getElementById('nombre_apellido').value = "";
        document.getElementById('dni').value = "";
        document.getElementById('materia').value = "";
        document.getElementById('edad').value = "";
    });
})