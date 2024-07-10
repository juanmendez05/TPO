const URL = "https://juanmendez.pythonanywhere.com/"
// Obtiene el contenido del inventario
function obtenerAlumnos() {
    fetch(URL + 'alumnos') // Realiza una solicitud GET al servidor y obtener la lista de alumnos.
    
    .then(response => {
    // Si es exitosa (response.ok), convierte los datos de la respuesta de formato JSON a un objeto JavaScript.
        if (response.ok) { return response.json(); }
    })
    
    // Asigna los datos de los alumnos obtenidos a la propiedad alumnos del estado.
    .then(data => {
        const alumnosTable = document.getElementById('alumnos-table').getElementsByTagName('tbody')[0];
        alumnosTable.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos
        
        data.forEach(alumno => {
            const row = alumnosTable.insertRow();
            row.innerHTML = `
                <td>${alumno.codigo}</td>
                <td>${alumno.nombre_apellido}</td>
                <td>${alumno.dni}</td>
                <td align="right">${alumno.materia}</td>
                <td>${alumno.edad}</td>
                <td><button onclick="eliminaralumno('${alumno.codigo}')">Eliminar</button></td>
                `;
        });
    })

    // Captura y maneja errores, mostrando una alerta en caso de error al obtener los alumnos.
    .catch(error => {
        console.log('Error:', error);
        alert('Error al obtener los alumnos.');
    });
}

// Se utiliza para eliminar un alumno.
function eliminaralumno(codigo) {
    // Se muestra un diálogo de confirmación. Si el usuario confirma, se realiza una solicitud DELETE al servidor a través de fetch(URL + 'alumnos/${codigo}', {method: 'DELETE' }).
    if (confirm('¿Estás seguro de que quieres eliminar este alumno?')) {
        fetch(URL + `alumnos/${codigo}`, { method: 'DELETE' })
        
        .then(response => {
            if (response.ok) {
            // Si es exitosa (response.ok), elimina el alumno y da mensaje de ok.
                obtenerAlumnos(); // Vuelve a obtener la lista de alumnos para actualizar la tabla.
                alert('alumno eliminado correctamente.');
            }
        })

        // En caso de error, mostramos una alerta con un mensaje de error.
        .catch(error => {
            alert(error.message);
        });
    }
}

// Cuando la página se carga, llama a obtenerAlumnos para cargar la lista de alumnos.
document.addEventListener('DOMContentLoaded', obtenerAlumnos);