from flask import jsonify, request
from flask_restful import Resource
from ggviz.db import DBConnection
import pandas as pd

class Annotation(Resource):
    def post(self, game_id, map_name, round_num):
        args = request.json
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Write to db
        df = pd.DataFrame(args, index=[0])
        df.to_sql("annotations", csgo_db.conn, if_exists="append", index = False)
        latest_anno = csgo_db.execute_pd_query("SELECT MAX(AnnotationID) AS LatestAnno FROM annotations")
        # Close db connection
        csgo_db.close_connection()
        latest_anno_id = int(latest_anno.LatestAnno.values[0])
        return jsonify({"action": "success", "AnnotationID": latest_anno_id})
    def get(self, game_id, map_name, round_num):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get all annotations for a game
        annotations_all = csgo_db.execute_pd_query("""SELECT GameID, MapName, RoundNum, AnnotationID, StartTick, EndTick, NumT, NumCT, Label, Tags, Description, PrimaryTeam, SecondaryTeam, StartWinProb, EndWinProb FROM annotations WHERE GameID='{0}' AND MapName='{1}' AND RoundNum={2}""".format(game_id, map_name, round_num))
        # Close db connection
        csgo_db.close_connection()
        # Set index and return JSON
        annotations_all.drop(["GameID", "MapName", "RoundNum"], axis=1, inplace=True)
        annotations_all.set_index("AnnotationID", inplace=True)
        return jsonify(annotations_all.to_dict("index"))


class AnnotationSimilar(Resource):
    def get(self, annotation_id):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get annotation
        annotation = csgo_db.execute_pd_query("""SELECT * FROM annotations WHERE AnnotationID={0}""".format(annotation_id))
        # Get similar annotations
        similar_annotations = csgo_db.execute_pd_query("""SELECT * FROM annotations WHERE MapName='{0}' AND Label='{1}'""".format(annotation.MapName.squeeze(), annotation.Label.squeeze()))
        # Close db connection
        csgo_db.close_connection()
        # Set index and return JSON
        similar_annotations.set_index("AnnotationID", inplace=True)
        return jsonify(similar_annotations.to_dict("index"))


class GamesAll(Resource):
    def get(self):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get all games
        games_all = csgo_db.execute_pd_query("SELECT GameID, CompetitionName, MatchName, GameDate, GameTime FROM games")
        # Close db connectin
        csgo_db.close_connection()
        # Set index and return JSON
        games_all.set_index("GameID", inplace=True)
        return jsonify(games_all.to_dict("index"))

class GameData(Resource):
    def get(self, game_id):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get a game's rounds
        rounds = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, StartCTScore, EndCTScore, StartTScore, EndTScore, RoundWinnerSide, RoundWinner, RoundLoser, Reason, CTCashSpentTotal, CTCashSpentRound, CTEqVal, TCashSpentTotal, TCashSpentRound, TEqVal
        FROM rounds
        WHERE GameID='{0}'""".format(game_id))
        win_probs = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, CTDistBombsiteA, CTDistBombsiteB, TDistBombsiteA, TDistBombsiteB, CTWinProb
        FROM tick_slice
        WHERE GameID='{0}'""".format(game_id))
        kills = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, AttackerID, AttackerName, AttackerTeam, AttackerSide, AttackerXViz, AttackerYViz, VictimID, VictimName, VictimTeam, VictimSide, VictimXViz, VictimYViz
        FROM kills
        WHERE GameID='{0}'""".format(game_id))
        grenades = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, PlayerID, PlayerName, Team, Side, XViz, YViz, GrenadeType
        FROM grenades
        WHERE GameID='{0}'""".format(game_id))
        footsteps = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, PlayerID, PlayerName, Team, Side, XViz, YViz
        FROM footsteps
        WHERE GameID='{0}'""".format(game_id))
        # Close db connectin
        csgo_db.close_connection()
        # Drop GameID column used to filter
        rounds.drop(["GameID"], axis=1, inplace=True)
        # JSONify using map as key
        rounds_dict = dict()
        for m in rounds.MapName.unique():
            # Create round object
            filtered_by_map = rounds[rounds["MapName"] == m]
            filtered_by_map.drop("MapName", axis=1, inplace=True)
            filtered_by_map.set_index("RoundNum", inplace=True)
            rounds_dict[m] = filtered_by_map.to_dict("index")
            # Get other data
            for r in rounds_dict[m].keys():
                # Win Prob
                win_prob_rounds = win_probs[(win_probs["RoundNum"] == r) & (win_probs["MapName"] == m)]
                win_prob_rounds.drop(["GameID", "MapName", "RoundNum"], axis = 1, inplace = True)
                win_prob_rounds.set_index("Tick", inplace=True)
                rounds_dict[m][r]["WinProb"] = win_prob_rounds.to_dict("index")
            return jsonify(rounds_dict)

class GameRounds(Resource):
    def get(self, game_id):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get a game's rounds
        rounds = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, StartCTScore, EndCTScore, StartTScore, EndTScore, RoundWinnerSide, RoundWinner, RoundLoser, CTCashSpentTotal, CTCashSpentRound, CTEqVal, TCashSpentTotal, TCashSpentRound, TEqVal
        FROM rounds
        WHERE GameID='{0}'""".format(game_id))
        # Close db connectin
        csgo_db.close_connection()
        # Drop GameID column used to filter
        rounds.drop(["GameID"], axis=1, inplace=True)
        # JSONify using map as key
        rounds_dict = dict()
        for m in rounds.MapName.unique():
            # Create round object
            filtered_by_map = rounds[rounds["MapName"] == m]
            filtered_by_map.drop("MapName", axis=1, inplace=True)
            filtered_by_map.set_index("RoundNum", inplace=True)
            rounds_dict[m] = filtered_by_map.to_dict("index")
        return jsonify(rounds_dict)

class RoundFootsteps(Resource):
    def get(self, game_id, map_name, round_num):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get a round's footsteps
        footsteps = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, PlayerID, PlayerName, Team, Side, XViz, YViz
        FROM footsteps
        WHERE GameID='{0}' AND
        MapName='{1}' AND
        RoundNum={2}""".format(game_id, map_name, round_num))
        # Close db connection
        csgo_db.close_connection()
        # Drop GameID column used to filter
        footsteps.drop(["GameID", "MapName", "RoundNum"], axis=1, inplace=True)
        # Get most recent at each tick
        df = footsteps.groupby(["Tick", "PlayerID"]).head(1)
        ticks_dict = dict()
        for tick in df.Tick.unique():
            filtered_by_tick = df[df["Tick"] == tick].groupby("PlayerID").head(1)
            filtered_by_tick.drop("Tick", axis=1, inplace=True)
            filtered_by_tick.set_index("PlayerID", inplace=True)
            ticks_dict[str(tick)] = filtered_by_tick.to_dict("index")
        return jsonify(ticks_dict)

class RoundKills(Resource):
    def get(self, game_id, map_name, round_num):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get a round's footsteps
        kills = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, AttackerID, AttackerName, AttackerTeam, AttackerSide, AttackerXViz, AttackerYViz, VictimID, VictimName, VictimTeam, VictimSide, VictimXViz, VictimYViz
        FROM kills
        WHERE GameID='{0}' AND
        MapName='{1}' AND
        RoundNum={2}""".format(game_id, map_name, round_num))
        # Close db connection
        csgo_db.close_connection()
        # Drop GameID column used to filter
        kills.drop(["GameID", "MapName", "RoundNum"], axis=1, inplace=True)
        # Set index and return JSON
        kills.set_index("Tick", inplace=True)
        return jsonify(kills.to_dict("index"))

class RoundGrenades(Resource):
    def get(self, game_id, map_name, round_num):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get a round's footsteps
        grenades = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, PlayerID, PlayerName, Team, Side, XViz, YViz, GrenadeType
        FROM grenades
        WHERE GameID='{0}' AND
        MapName='{1}' AND
        RoundNum={2}""".format(game_id, map_name, round_num))
        # Close db connection
        csgo_db.close_connection()
        # Drop GameID column used to filter
        grenades.drop(["GameID", "MapName", "RoundNum"], axis=1, inplace=True)
        # Set index and return JSON
        grenades.set_index("Tick", inplace=True)
        return jsonify(grenades.to_dict("index"))

class RoundWinProb(Resource):
    def get(self, game_id, map_name, round_num):
        # Connect to database
        csgo_db = DBConnection()
        csgo_db.create_connection()
        # Get a round's win probabilities
        win_probs = csgo_db.execute_pd_query("""
        SELECT GameID, MapName, RoundNum, Tick, CTDistBombsiteA, CTDistBombsiteB, TDistBombsiteA, TDistBombsiteB, CTWinProb
        FROM tick_slice
        WHERE GameID='{0}' AND
        MapName='{1}' AND
        RoundNum={2}
        """.format(game_id, map_name, round_num))
        # Close db connection
        csgo_db.close_connection()
        # Drop columns used to filter
        win_probs.drop(["GameID", "MapName", "RoundNum"], axis=1, inplace=True)
        # Fill NA
        win_probs.CTDistBombsiteA.fillna(method="ffill", inplace=True)
        win_probs.CTDistBombsiteB.fillna(method="ffill", inplace=True)
        win_probs.TDistBombsiteA.fillna(method="ffill", inplace=True)
        win_probs.TDistBombsiteB.fillna(method="ffill", inplace=True)
        win_probs.CTWinProb.fillna(method="ffill", inplace=True)
        # Set index and return JSON
        win_probs.set_index("Tick", inplace=True)
        return jsonify(win_probs.to_dict("index"))


