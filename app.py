from flask import Flask, g, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)
DATABASE = 'database.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            nacionalidad TEXT,
            fecha_nacimiento DATE
        );
        create table if not exists administradores (
            id_administrador INTEGER PRIMARY KEY AUTOINCREMENT,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        );
        CREATE TABLE IF NOT EXISTS externos (
            id_externo INTEGER PRIMARY KEY AUTOINCREMENT,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        );
        CREATE TABLE IF NOT EXISTS superusuarios (
            id_superusuario INTEGER PRIMARY KEY AUTOINCREMENT,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        );
    ''')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        # Handle registration logic here
        return redirect(url_for('index'))
    return render_template('registro.html')

@app.route('/servicios')
def servicios():
    return render_template('servicios.html')

@app.route('/inicio')
def inicio():
    return render_template('inicio.html')

if __name__ == '__main__':
    init_db()
    app.run(debug=True)