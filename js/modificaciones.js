//const URL = "http://127.0.0.1:5000/"
//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
const URL = "https://juanmendez.pythonanywhere.com/"

// Variables de estado para controlar la visibilidad y los datos del formulario
let codigo = '';
let nombre_apellido = '';
let dni = '';
let materia = '';
let edad = '';
let mostrarDatosAlumno = false;

document.getElementById('form-obtener-alumno').addEventListener('submit', obtenerAlumno);
document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);


// Se ejecuta cuando se envía el formulario de consulta. Realiza una solicitud GET a la API y obtiene los datos del alumno correspondiente al código ingresado.
function obtenerAlumno(event) {
    event.preventDefault();
    codigo = document.getElementById('codigo').value;
    
    fetch(URL + 'alumnos/' + codigo)

    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al obtener los datos del alumno.')
        }
    })

    .then(data => {
        nombre_apellido = data.nombre_apellido;
        dni = data.dni;
        materia = data.materia;
        edad = data.edad;
        mostrarDatosAlumno = true; //Activa la vista del segundo formulario
        mostrarFormulario();
    })

    .catch(error => {
        alert('Código no encontrado.');
    });
}

// Muestra el formulario con los datos del alumno
function mostrarFormulario() {
    if (mostrarDatosAlumnos) {
        document.getElementById('nombre_apellidoModificar').value = nombre_apellido;
        document.getElementById('dniModificar').value = dni;
        document.getElementById('materiaModificar').value = materia;
        document.getElementById('edadModificar').value = edad;

        document.getElementById('datos-alumno').style.display = 'block';
    } else {
        document.getElementById('datos-alumno').style.display = 'none';
    }
}


// Se usa para enviar los datos modificados del alumno al servidor.
function guardarCambios(event) {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append('codigo', codigo);
    formData.append('nombre_apellido', document.getElementById('nombre_apellidoModificar').value);
    formData.append('dni', document.getElementById('dniModificar').value);
    formData.append('edad', document.getElementById('edadModificar').value);
    formData.append('materia', document.getElementById('materiaModificar').value);
    
    
    fetch(URL + 'alumnos/' + codigo, {
        method: 'PUT',
        body: formData,
    })

    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al guardar los cambios del alumno.')
        }
    })

    .then(data => {
        alert('alumno actualizado correctamente.');
        limpiarFormulario();
    })

    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el alumno.');
    });
}

// Restablece todas las variables relacionadas con el formulario a sus valores iniciales, lo que efectivamente "limpia" el formulario.
function limpiarFormulario() {
    document.getElementById('codigo').value = '';
    document.getElementById('nombre_apellidoModificar').value = '';
    document.getElementById('dniModificar').value = '';
    document.getElementById('materiaModificar').value = '';
    document.getElementById('edadModificar').value = '';


    codigo = '';
    nombre_apellido = '';
    dni = '';
    materia = '';
    edad = '';
    mostrarDatosAlumnos = false;
    document.getElementById('datos-alumno').style.display = 'none';
}