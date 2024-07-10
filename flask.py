from flask import *
from flask_cors import CORS
from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)
CORS(app)

class Catalogo:
#----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )

        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS alumno (
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            nombre_apellido VARCHAR(45) NOT NULL,
            dni INT NOT NULL,
            materia VARCHAR(80) NOT NULL,
            edad INT NOT NULL)''')
        self.conn.commit()

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

        #----------------------------------------------------------------

    def agregar_alumno(self, nombre_apellido, dni, materia, edad):
        sql = "INSERT INTO alumno (nombre_apellido, dni, materia, edad) VALUES (%s, %s, %s, %s)"
        valores = (nombre_apellido, dni, materia, edad)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    #----------------------------------------------------------------

    def consultar_alumno(self, codigo):
    # Consultamos un alumno a partir de su codigo
        self.cursor.execute(f"SELECT * FROM alumno WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    #----------------------------------------------------------------

    def modificar_alumno(self, codigo, nueva_nombre_apellido, nueva_dni, nuevo_materia, nuevo_edad):
        sql = "UPDATE alumno SET nombre_apellido = %s, dni = %s, materia = %s, edad = %s WHERE codigo = %s"
        valores = (nueva_nombre_apellido, nueva_dni, nuevo_materia, nuevo_edad, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------

    def listar_alumno(self):
        self.cursor.execute("SELECT * FROM alumno")
        alumno = self.cursor.fetchall()
        return alumno

    #----------------------------------------------------------------

    def eliminar_alumno(self, codigo):
    # Eliminamos un alumno de la tabla a partir de su codigo
        self.cursor.execute(f"DELETE FROM alumno WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------

    def mostrar_alumno(self, codigo):
    # Mostramos los datos de un alumno a partir de su codigo
        alumno = self.consultar_alumno(codigo)
        if alumno:
            print("-" * 40)
            print(f"codigo.....: {alumno['codigo']}")
            print(f"nombre_apellido: {alumno['nombre_apellido']}")
            print(f"dni...: {alumno['dni']}")
            print(f"materia.....: {alumno['materia']}")
            print(f"edad..: {alumno['edad']}")
            print("-" * 40)
        else:
            print("alumno no encontrado.")

#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
#catalogo = Catalogo(host='127.0.0.1', port='4002', user='root', password='123456',database='miapp')
catalogo = Catalogo(host='juanmendez.mysql.pythonanywhere-services.com', user='juanmendez', password='Codo2024', database='juanmendez$alumnos')

@app.route("/alumnos", methods=["GET"])
def lista_alumno():
    alumno = catalogo.listar_alumno()
    return jsonify(alumno)

#--------------------------------------------------------------------
# Mostrar un sólo alumno según su codigo
#--------------------------------------------------------------------
#La ruta Flask /alumnos/<int:codigo> con el método HTTP GET está diseñada para proporcionar los detalles de un alumno específico basado en su codigo.
#El método busca en la base de datos el alumno con el codigo especificado y devuelve un JSON con los detalles del alumno si lo encuentra, o None si no lo encuentra.
@app.route("/alumnos/<int:codigo>", methods=["GET"])
def mostrar_alumno(codigo):
    alumno = catalogo.consultar_alumno(codigo)
    if alumno:
        return jsonify(alumno)
    else:
        return "alumno no encontrado", 404

#--------------------------------------------------------------------
# Agregar un alumno
#--------------------------------------------------------------------
@app.route("/alumnos", methods=["POST"])
#La ruta Flask `/alumnos` con el método HTTP POST está diseñada para permitir la adición de un nuevo alumno a la base de datos.
#La función agregar_alumno se asocia con esta URL y es llamada cuando se hace una solicitud POST a /alumnos.
def agregar_alumno():
    #Recojo los datos del form
    nombre_apellido = request.form['nombre_apellido']
    dni = request.form['dni']
    materia = request.form['materia']
    edad = request.form['edad']

    nuevo_codigo = catalogo.agregar_alumno(nombre_apellido, dni, materia, edad)
    if nuevo_codigo:


        #Si el alumno se agrega con éxito, se devuelve una respuesta JSON con un mensaje de éxito y un codigo de estado HTTP 201 (Creado).
        return jsonify({"mensaje": "alumno agregado correctamente.", "codigo": nuevo_codigo}), 201
    else:
        #Si el alumno no se puede agregar, se devuelve una respuesta JSON con un mensaje de error y un codigo de estado HTTP 500 (Internal Server Error).
        return jsonify({"mensaje": "Error al agregar el alumno."}), 500

#--------------------------------------------------------------------
# Modificar un alumno según su codigo
#--------------------------------------------------------------------
@app.route("/alumnos/<int:codigo>", methods=["PUT"])
#La ruta Flask /alumnos/<int:codigo> con el método HTTP PUT está diseñada para actualizar la información de un alumno existente en la base de datos, identificado por su codigo.
#La función modificar_alumno se asocia con esta URL y es invocada cuando se realiza una solicitud PUT a /alumnos/ seguido de un número (el codigo del alumno).
def modificar_alumno(codigo):
    #Se recuperan los nuevos datos del formulario
    nueva_nombre_apellido = request.form.get("nombre_apellido")
    nueva_dni = request.form.get("dni")
    nuevo_materia = request.form.get("materia")
    nuevo_edad = request.form.get("edad")


    # Se llama al método modificar_alumno pasando el codigo del alumno y los nuevos datos.
    if catalogo.modificar_alumno(codigo, nueva_nombre_apellido, nueva_dni, nuevo_materia, nuevo_edad):
        #Si la actualización es exitosa, se devuelve una respuesta JSON con un mensaje de éxito y un codigo de estado HTTP 200 (OK).
        return jsonify({"mensaje": "alumno modificado"}), 200
    else:
        #Si el alumno no se encuentra (por ejemplo, si no hay ningún alumno con el codigo dado), se devuelve un mensaje de error con un codigo de estado HTTP 404 (No Encontrado).
        return jsonify({"mensaje": "alumno no encontrado"}), 404

#--------------------------------------------------------------------
# Eliminar un alumno según su codigo
#--------------------------------------------------------------------
@app.route("/alumnos/<int:codigo>", methods=["DELETE"])
#La ruta Flask /alumno/<int:codigo> con el método HTTP DELETE está diseñada para eliminar un alumno específico de la base de datos, utilizando su codigo como identificador.
#La función eliminar_alumno se asocia con esta URL y es llamada cuando se realiza una solicitud DELETE a /alumno/ seguido de un número (el codigo del alumno).
def eliminar_alumno(codigo):
    # Busco el alumno en la base de datos
    alumno = catalogo.consultar_alumno(codigo)
    if alumno:
        # Elimina el alumno del catálogo
        if catalogo.eliminar_alumno(codigo):
            #Si el alumno se elimina correctamente, se devuelve una respuesta JSON con un mensaje de éxito y un codigo de estado HTTP 200 (OK).
            return jsonify({"mensaje": "alumno eliminado"}), 200
        else:
            #Si ocurre un error durante la eliminación (por ejemplo, si el alumno no se puede eliminar de la base de datos por alguna razón), se devuelve un mensaje de error con un codigo de estado HTTP 500 (Error Interno del Servidor)
            return jsonify({"mensaje": "Error al eliminar el alumno"}), 500
    else:
        #Si el alumno no se encuentra (por ejemplo, si no existe un alumno con el codigo proporcionado), se devuelve un mensaje de error con un codigo de estado HTTP 404 (No Encontrado).
        return jsonify({"mensaje": "alumno no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)
