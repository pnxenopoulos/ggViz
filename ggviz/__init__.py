import os
import sqlite3
import pandas as pd

from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS

from ggviz.resources import Annotation, AnnotationSimilar, GamesAll, GameRounds, RoundFootsteps, RoundKills, RoundGrenades, RoundWinProb, GameData


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_folder="static")
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    CORS(app)
    api = Api(app)

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

    # Annotation
    api.add_resource(Annotation, "/api/annotation/<string:game_id>/<string:map_name>/<int:round_num>")

    # Similar annotations
    api.add_resource(AnnotationSimilar, "/api/annotation/<int:annotation_id>/similar")

    # All games
    api.add_resource(GamesAll, "/api/games/all")

    # Game data
    api.add_resource(GameData, "/api/<string:game_id>")

    # All rounds for a game
    api.add_resource(GameRounds, "/api/rounds/<string:game_id>")

    # All footsteps in a round
    api.add_resource(RoundFootsteps, "/api/footsteps/<string:game_id>/<string:map_name>/<int:round_num>")

    # All kills in a round
    api.add_resource(RoundKills, "/api/kills/<string:game_id>/<string:map_name>/<int:round_num>")

    # All grenades in a round
    api.add_resource(RoundGrenades, "/api/grenades/<string:game_id>/<string:map_name>/<int:round_num>")

    # Win Prob for a round
    api.add_resource(RoundWinProb, "/api/win_prob/<string:game_id>/<string:map_name>/<int:round_num>")

    return app


