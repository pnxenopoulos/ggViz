import os

from flask import Flask, render_template



def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_folder="static", template_folder="templates")
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Hello World
    @app.route('/hello')
    def hello_world():
        return 'Hello, World!'

    # Base page
    @app.route('/')
    @app.route('/index')
    @app.route('/home')
    def index():
        page = {'title': 'ggViz', 'desc': 'A CSGO Visualization Tool'}
        return render_template('index.html', page=page)

    return app
