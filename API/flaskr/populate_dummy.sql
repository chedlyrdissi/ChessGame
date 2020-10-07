INSERT INTO user (id, username, password)
VALUES  (0, 'admin', 'admin'),
        (1, 'chedly', 'chedly'),
        (2, 'rdissi', 'rdissi'),
        (3, 'test', 'test');

INSERT INTO active_game (player_white_id, player_black_id, current_player)
VALUES  (0, 1, 0),
        (0, 2, 0),
        (1, 2, 1),
        (2, 1, 2),
        (0, 3, 0),
        (3, 1, 3);

INSERT INTO finished_game (player_white_id, player_black_id, winner)
VALUES  (0, 1, 0),
        (0, 2, 0),
        (1, 2, 1),
        (2, 1, 2),
        (0, 3, 0),
        (3, 1, 3);