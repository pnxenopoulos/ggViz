import sqlite3
import pandas as pd
from sqlite3 import Error


class DBConnection:
    """ Connect and play with database
    """

    def __init__(self, filename = "data/csgo.db"):
        """ Initialize DBConnection object
        """
        self.filename = filename

    def create_connection(self):
        """ Create a database connection to a SQLite database
        """
        self.conn = None
        try:
            self.conn = sqlite3.connect(self.filename)
        except Error as e:
            print(e)

    def close_connection(self):
        """ Close current connection
        """
        try:
            if self.conn is not None:
                self.conn.close()
                self.conn = None
            else:
                print("No current connection")
        except Error as e:
            print(e)

    def execute_query(self, query):
        """ Execute query
        """
        if self.conn:
            try:
                c = self.conn.cursor()
                c.execute(query)
            except Error as e:
                print(e)
        else:
            print("No valid connection object")

    def execute_pd_query(self, query):
        """ Execute query with pandas output
        """
        if self.conn:
            try:
                df = pd.read_sql(query, self.conn)
                return df
            except Error as e:
                print(e)
        else:
            print("No valid connection object")

    def make_kills(self):
        """ Make kills table
        """
        kills_query = """
        -- kills table
        CREATE TABLE IF NOT EXISTS kills (
          GameID varchar(300) NOT NULL,
          CompetitionName varchar(300) NOT NULL,
          MatchName varchar(100) NOT NULL,
          GameDate DATE NOT NULL,
          GameTime varchar(20) NOT NULL,
          MapName varchar(30) NOT NULL,
          RoundNum int(8) NOT NULL,
          Tick int(12) NOT NULL,
          VictimX double NOT NULL,
          VictimY double NOT NULL,
          VictimZ double NOT NULL,
          VictimXViz double NOT NULL,
          VictimYViz double NOT NULL,
          VictimViewX double NOT NULL,
          VictimViewY double NOT NULL,
          VictimAreaID int(6) NOT NULL,
          VictimAreaName varchar(100) NOT NULL,
          AttackerX double NOT NULL,
          AttackerY double NOT NULL,
          AttackerZ double NOT NULL,
          AttackerXViz double NOT NULL,
          AttackerYViz double NOT NULL,
          AttackerViewX double NOT NULL,
          AttackerViewY double NOT NULL,
          AttackerAreaID int(6) NOT NULL,
          AttackerAreaName varchar(100) NOT NULL,
          VictimID int(40) NOT NULL,
          VictimName varchar(60) NOT NULL,
          VictimTeam varchar(100) NOT NULL,
          VictimSide varchar(20) NOT NULL,
          VictimTeamEqVal int(10) NOT NULL,
          AttackerID int(40) NOT NULL,
          AttackerName varchar(60) NOT NULL,
          AttackerTeam varchar(100) NOT NULL,
          AttackerSide varchar(20) NOT NULL,
          AttackerTeamEqVal int(10) NOT NULL,
          AssisterID int(40) NOT NULL,
          AssisterName varchar(60) NOT NULL,
          AssisterTeam varchar(100) NOT NULL,
          Assisterside varchar(20) NOT NULL,
          WeaponID int(6) NOT NULL,
          IsWallshot int(3) NOT NULL,
          IsFlashed int(3) NOT NULL,
          IsHeadshot int(3) NOT NULL,
          PRIMARY KEY(GameID, MapName, RoundNum, Tick, AttackerID, VictimID)
        )
        """
        self.execute_query(kills_query)

    def make_damages(self):
        """ Make damages table
        """
        kills_query = """
        -- kills table
        CREATE TABLE IF NOT EXISTS damages (
          GameID varchar(300) NOT NULL,
          CompetitionName varchar(300) NOT NULL,
          MatchName varchar(100) NOT NULL,
          GameDate DATE NOT NULL,
          GameTime varchar(20) NOT NULL,
          MapName varchar(30) NOT NULL,
          RoundNum int(8) NOT NULL,
          Tick int(12) NOT NULL,
          VictimX double NOT NULL,
          VictimY double NOT NULL,
          VictimZ double NOT NULL,
          VictimXViz double NOT NULL,
          VictimYViz double NOT NULL,
          VictimViewX double NOT NULL,
          VictimViewY double NOT NULL,
          VictimAreaID int(6) NOT NULL,
          VictimAreaName varchar(100) NOT NULL,
          AttackerX double NOT NULL,
          AttackerY double NOT NULL,
          AttackerZ double NOT NULL,
          AttackerXViz double NOT NULL,
          AttackerYViz double NOT NULL,
          AttackerViewX double NOT NULL,
          AttackerViewY double NOT NULL,
          AttackerAreaID int(6) NOT NULL,
          AttackerAreaName varchar(100) NOT NULL,
          VictimID int(40) NOT NULL,
          VictimName varchar(60) NOT NULL,
          VictimTeam varchar(100) NOT NULL,
          VictimSide varchar(20) NOT NULL,
          VictimTeamEqVal int(10) NOT NULL,
          AttackerID int(40) NOT NULL,
          AttackerName varchar(60) NOT NULL,
          AttackerTeam varchar(100) NOT NULL,
          AttackerSide varchar(20) NOT NULL,
          AttackerTeamEqVal int(10) NOT NULL,
          HpDamage int(6) NOT NULL,
          KillHpDamage int(6) NOT NULL,
          ArmorDamage int(6) NOT NULL,
          WeaponID int(6) NOT NULL,
          HitGroup int(6) NOT NULL
        )
        """
        self.execute_query(kills_query)

    def make_bomb_events(self):
        """ Make bomb events table
        """
        bomb_events_query = """
        -- bomb event table
        CREATE TABLE IF NOT EXISTS bomb_events (
            GameID varchar(300) NOT NULL,
            CompetitionName varchar(300) NOT NULL,
            MatchName varchar(300) NOT NULL,
            GameDate DATE NOT NULL,
            GameTime varchar(20) NOT NULL,
            MapName varchar(30) NOT NULL,
            RoundNum int(8) NOT NULL,
            Tick int(12) NOT NULL,
            PlayerID int(40) NOT NULL,
            PlayerName varchar(60) NOT NULL,
            Team varchar(100) NOT NULL,
            AreaID int(6) NOT NULL,
            BombSite varchar(10) NOT NULL,
            EventType varchar(60) NOT NULL,
            PRIMARY KEY(GameID, MapName, RoundNum, Tick, PlayerID, EventType)
        )"""
        self.execute_query(bomb_events_query)

    def make_rounds(self):
        """ Make rounds table
        """
        rounds_query = """
        -- round table
        CREATE TABLE IF NOT EXISTS rounds (
          GameID varchar(300) NOT NULL,
          CompetitionName varchar(300) NOT NULL,
          MatchName varchar(100) NOT NULL,
          GameDate DATE NOT NULL,
          GameTime varchar(20) NOT NULL,
          MapName varchar(30) NOT NULL,
          RoundNum int(8) NOT NULL,
          StartTick int(12) NOT NULL,
          EndTick int(12) NOT NULL,
          EndCTScore int(3) NOT NULL,
          EndTScore int(3) NOT NULL,
          StartTScore int(3) NOT NULL,
          StartCTScore int(3) NOT NULL,
          RoundWinnerSide varchar(10) NOT NULL,
          RoundWinner varchar(100) NOT NULL,
          RoundLoser varchar(100) NOT NULL,
          Reason varchar(100) NOT NULL,
          CTCashSpentTotal int(6) NOT NULL,
          CTCashSpentRound int(6) NOT NULL,
          CTEqVal int(6) NOT NULL,
          TCashSpentTotal int(6) NOT NULL,
          TCashSpentRound int(6) NOT NULL,
          TEqVal int(6) NOT NULL,
          PRIMARY KEY(GameID, MapName, RoundNum)
        )"""
        self.execute_query(rounds_query)

    def make_footsteps(self):
        """ Make footsteps table
        """
        footsteps_query = """
        -- footsteps table
        CREATE TABLE IF NOT EXISTS footsteps (
          GameID varchar(300) NOT NULL,
          CompetitionName varchar(300) NOT NULL,
          MatchName varchar(100) NOT NULL,
          GameDate DATE NOT NULL,
          GameTime varchar(20) NOT NULL,
          MapName varchar(30) NOT NULL,
          RoundNum int(8) NOT NULL,
          Tick int(12) NOT NULL,
          PlayerID int(40) NOT NULL,
          PlayerName varchar(60) NOT NULL,
          Team varchar(100) NOT NULL,
          Side varchar(20) NOT NULL,
          X double NOT NULL,
          Y double NOT NULL,
          Z double NOT NULL,
          XViz double NOT NULL,
          YViz double NOT NULL,
          ViewX double NOT NULL,
          ViewY double NOT NULL,
          AreaID int(6) NOT NULL,
          AreaName varchar(60) NOT NULL,
          DistanceBombsiteA int(4) NOT NULL,
          DistanceBombsiteB int(4) NOT NULL
        )"""
        self.execute_query(footsteps_query)

    def make_grenades(self):
        """ Make grenades table
        """
        grenades_query = """
        -- grenades table
        CREATE TABLE IF NOT EXISTS grenades (
            GameID varchar(300) NOT NULL,
            CompetitionName varchar(300) NOT NULL,
            MatchName varchar(100) NOT NULL,
            GameDate DATE NOT NULL,
            GameTime varchar(20) NOT NULL,
            MapName varchar(30) NOT NULL,
            RoundNum int(8) NOT NULL,
            Tick int(12) NOT NULL,
            PlayerID int(40) NOT NULL,
            PlayerName varchar(60) NOT NULL,
            Team varchar(100) NOT NULL,
            Side varchar(20) NOT NULL,
            X double NOT NULL,
            Y double NOT NULL,
            Z double NOT NULL,
            XViz double NOT NULL,
            YViz double NOT NULL,
            AreaID int(6) NOT NULL,
            AreaName varchar(60) NOT NULL,
            GrenadeType varchar(60) NOT NULL,
            PRIMARY KEY(GameID, MapName, RoundNum, Tick, PlayerID, GrenadeType)
        )
        """
        self.execute_query(grenades_query)

    def make_games(self):
        """ Make games table
        """
        games_query = """
        -- games table
        CREATE TABLE IF NOT EXISTS games (
          GameID varchar(300) NOT NULL,
          CompetitionName varchar(300) NOT NULL,
          MatchName varchar(300) NOT NULL,
          GameDate DATE NOT NULL,
          GameTime varchar(20) NOT NULL,
          GameType varchar(50),
          MatchLink varchar(300) NOT NULL,
          DemoLink varchar(300) NOT NULL,
          DemoLocation varchar(300) DEFAULT '' NOT NULL,
          DemoScraped int(6) DEFAULT 0 NOT NULL,
          DemoParsed int(6) DEFAULT 0 NOT NULL,
          PRIMARY KEY(GameID)
        )
        """
        self.execute_query(games_query)

    def make_stats(self):
        """ Make stats table
        """
        stats_query = """
        -- stats table
        CREATE TABLE IF NOT EXISTS stats (
            CompetitionName varchar(300) NOT NULL,
            MatchName varchar(300) NOT NULL,
            GameDate DATE NOT NULL,
            GameTime varchar(20) NOT NULL,
            MapName varchar(100) NOT NULL,
            Team varchar(100) NOT NULL,
            PlayerName varchar(100) NOT NULL,
            Kills int(6) NOT NULL,
            Deaths int(6) NOT NULL,
            ADR double NOT NULL,
            KAST double NOT NULL,
            Rating double NOT NULL,
            PRIMARY KEY(CompetitionName, MatchName, GameDate, GameTime, MapName, Team, PlayerName)
        )
        """
        self.execute_query(stats_query)

    def make_match_links(self):
        """ Make match links table
        """
        match_link_query = """
        -- match link table
        CREATE TABLE IF NOT EXISTS match_links (
            MatchLink varchar(500) NOT NULL,
            MatchScraped int(3) NOT NULL
        )
        """
        self.execute_query(match_link_query)

    def make_tick_slice(self):
        """ Make tick slice
        """
        tick_slice_query = """
        -- tick slice table
        CREATE TABLE IF NOT EXISTS tick_slice (
            GameID varchar(300) NOT NULL,
            CompetitionName varchar(300) NOT NULL,
            MatchName varchar(300) NOT NULL,
            GameDate DATE NOT NULL,
            GameTime varchar(20) NOT NULL,
            MapName varchar(100) NOT NULL,
            RoundNum int(8) NOT NULL,
            Tick int(8) NOT NULL,
            TicksSinceStart int(8) NOT NULL,
            CTWin int(3) NOT NULL,
            CTEqVal int(6),
            TEqVal int(6),
            TRemaining int(3) NOT NULL,
            CTRemaining int(3) NOT NULL,
            THpRemaining int(6) NOT NULL,
            CTHpRemaining int(6) NOT NULL,
            BombPlanted int(3) NOT NULL,
            BombSite varchar(20) NOT NULL,
            CTDistBombsiteA int(6),
            CTDistBombsiteB int(6),
            TDistBombsiteA int(6),
            TDistBombsiteB int(6),
            AttackerID int(40),
            AttackerName varchar(60),
            AttackerTeam varchar(100),
            VictimID int(40),
            VictimName varchar(60),
            VictimTeam varchar(100),
            CTWinProb float DEFAULT 0.5,
            PRIMARY KEY(GameID, MapName, RoundNum, Tick)
        )
        """
        self.execute_query(tick_slice_query)

    def make_annotations(self):
        """ Make annotations table
        """
        annotations_query = """
        -- annotations table
        CREATE TABLE IF NOT EXISTS annotations (
            AnnotationID INTEGER PRIMARY KEY AUTOINCREMENT,
            GameID varchar(300) NOT NULL,
            MapName varchar(100) NOT NULL,
            RoundNum int(8) NOT NULL,
            StartTick int(8) NOT NULL,
            EndTick int(8) NOT NULL,
            NumT int(3) NOT NULL,
            NumCT int(3) NOT NULL,
            Label varchar(100) NOT NULL,
            Tags varchar(500) DEFAULT NULL,
            Description text DEFAULT NULL,
            PrimaryTeam varchar(100) DEFAULT NULL,
            SecondaryTeam varchar(100) DEFAULT NULL,
            StartWinProb float DEFAULT 0.5,
            EndWinProb float DEFAULT 0.5
        )
        """
        self.execute_query(annotations_query)

    def make_test_annotations(self):
        """ Make test table
        """
        annotations_query = """
        -- annotations table
        CREATE TABLE IF NOT EXISTS annotations (
            GameID varchar(300) NOT NULL,
            MapName varchar(100) NOT NULL,
            RoundNum int(8) NOT NULL,
            StartTick int(8) NOT NULL,
            EndTick int(8) NOT NULL
        )
        """
        self.execute_query(annotations_query)
