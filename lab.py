from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
app = Flask(__name__)
app.secret_key = 'clave_secreta'
DATABASE = 'biblioteca.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.executescript('''      
        CREATE TABLE IF NOT EXISTS usuarios_admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            rol TEXT NOT NULL
        );
   
        CREATE TABLE IF NOT EXISTS mapa_procesos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            archivo TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            fecha_creacion TEXT NOT NULL,
            fecha_actualizacion TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS gestion_calidad (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            archivo TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            fecha_creacion TEXT NOT NULL,
            fecha_actualizacion TEXT NOT NULL
        );
                            
    ''')
    conn.commit()
    conn.close()


#principal
@app.route('/')
def inicio():
    return render_template('home/index.html')

@app.route('/servicios')
def servicios():
    return render_template('home/servicios.html')

@app.route('/gestion_calidad')
def gestion_calidad():
    return render_template('home/gestion_calidad.html')

@app.route('/mapa_procesos')
def mapa_procesos():
    return render_template('home/mapa_procesos.html')
#inicio de sesion y registro de administrador
@app.route('/inicio_sesion')
def inicio_sesion():
    return render_template('admin/inicio_sesion.html')

@app.route('/registro')
def registro():
    
    return render_template('home/registro.html')

@app.route('/index_admin')
def index_admin():
    return render_template('admin/index_admin.html')
#gestion de usuarios

if __name__ == '__main__':
    app.run(debug=True)
