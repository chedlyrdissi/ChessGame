DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS active_game;
DROP TABLE IF EXISTS finished_game;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE active_game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_white_id INTEGER NOT NULL,
    player_black_id INTEGER,
    current_player INTEGER NOT NULL,
    current_cell_row INTEGER,
    current_cell_column INTEGER,
    next_cell_row INTEGER,
    next_cell_column INTEGER,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (current_player) REFERENCES user (id)
);

CREATE TABLE finished_game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_white_id INTEGER NOT NULL,
    player_black_id INTEGER NOT NULL,
    winner INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (player_white_id) REFERENCES user (id),
    FOREIGN KEY (winner) REFERENCES user (id)
);