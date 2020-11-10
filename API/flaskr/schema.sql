BEGIN;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS active_game;
DROP TABLE IF EXISTS finished_game;
DROP TABLE IF EXISTS piece_positions;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL CHECK ( length(username) > 0 ),
  password TEXT NOT NULL CHECK ( length(password) > 0 ),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP CHECK ( last_modified >= created )
);

CREATE TABLE active_game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_white_id INTEGER NOT NULL,
    player_black_id INTEGER,
    current_player INTEGER CHECK ( current_player == player_white_id OR current_player == player_black_id ),
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (current_player) REFERENCES user (id)
);

CREATE TABLE piece_positions (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER     NOT NULL,
    row     INTEGER     NOT NULL,
    col  INTEGER     NOT NULL,
    piece   VARCHAR(6)  NOT NULL CHECK ( piece in ('pawn','rook','knight','bishop','king','queen') ),
    color   CHARACTER(1) NOT NULL CHECK ( color in ('b','w') ),
    first_move BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (game_id) REFERENCES active_game(id)
);


CREATE TABLE finished_game (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id         INTEGER     NOT NULL,
    player_white_id INTEGER     NOT NULL,
    player_black_id INTEGER     NOT NULL,
    winner          INTEGER     NOT NULL CHECK ( winner == player_black_id OR winner == player_white_id ),
    start_time      TIMESTAMP   NOT NULL,
    end_time        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP CHECK ( end_time > start_time ),
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (winner) REFERENCES user (id)
);

COMMIT;