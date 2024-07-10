//const URL = "http://127.0.0.1:5000/"
// Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
const URL = "https://juanmendez.pythonanywhere.com/"

// Realizamos la solicitud GET al servidor para obtener todos los alumnos.
fetch(URL + 'alumnos')

.then(function (response) {
    if (response.ok) {
    //Si la respuesta es exitosa (response.ok), convierte el cuerpo de la respuesta de formato JSON a un objeto JavaScript y pasa estos datos a la siguiente promesa then.
        return response.json();
    } else {
    // Si hubo un error, lanzar explícitamente una excepción para ser "catcheada" más adelante
        throw new Error('Error al obtener los alumnos.');
    }
})

//Esta función maneja los datos convertidos del JSON.
.then(function (data) {
    let tablaAlumnos = document.getElementById('tablaAlumnos'); //Selecciona el elemento del DOM donde se mostrarán los alumnos.

    // Iteramos sobre cada alumno y agregamos filas a la tabla
    for (let alumno of data) {
        let fila = document.createElement('tr'); //Crea una nueva fila de tabla (<tr>) para cada alumno.
        
        fila.innerHTML = '<td>' + alumno.codigo + '</td>' +
            '<td>' + alumno.nombre_apellido + '</td>' +
            '<td align="right">' + alumno.dni + '</td>' +
            '<td align="right">' + alumno.materia + '</td>' +
            '<td align="right">' + alumno.edad + '</td>' 

        //Una vez que se crea la fila con el contenido del alumno, se agrega a la tabla utilizando el método appendChild del elemento tablaAlumnos.
        tablaAlumnos.appendChild(fila);
    }
})

//Captura y maneja errores, mostrando una alerta en caso de error al obtener los alumnos.
.catch(function (error) {
    // Código para manejar errores
    alert('Error al obtener los alumnos.');
});