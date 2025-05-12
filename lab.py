from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route('/')
def inicio():
    return render_template('home/index.html')

@app.route('/agregar_libro', methods=['GET', 'POST'])
def agregar_libro():
    if request.method == 'POST':
       print(request.form)
    return render_template('agregar_libro.html')


if __name__ == '__main__':
    app.run(debug=True)