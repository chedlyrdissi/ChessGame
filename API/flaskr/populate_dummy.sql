INSERT INTO user (id, username, password)
VALUES  (0, 'admin', 'admin'),
        (1, 'chedly', 'chedly'),
        (2, 'rdissi', 'rdissi'),
        (3, 'test', 'test');

INSERT INTO active_game (id, player_white_id, player_black_id, current_player)
VALUES  (0, 0, 1, 1);

INSERT INTO active_game (id, player_white_id, player_black_id)
VALUES (1, 0, 2);

INSERT INTO piece_positions(game_id, row, col, piece, color)
VALUES  (0, 0, 0, 'king', 'w'),
        (0, 3, 0, 'rook', 'b'),
        (0, 0, 3, 'rook', 'b'),
        (0, 3, 3, 'bishop', 'b'),
        (0, 5, 0, 'king', 'b');

INSERT INTO finished_game (player_white_id, player_black_id, winner, start_time, end_time)
VALUES  (0, 1, 0, '2020-10-07 08:23:19.120', '2020-10-07 09:23:19.120'),
        (0, 2, 0, '2020-10-07 08:23:19.120', '2020-10-07 09:23:19.120'),
        (1, 2, 1, '2020-10-07 08:23:19.120', '2020-10-07 09:23:19.120'),
        (2, 1, 2, '2020-10-07 08:23:19.120', '2020-10-07 09:23:19.120'),
        (0, 3, 0, '2020-10-07 08:23:19.120', '2020-10-07 09:23:19.120'),
        (3, 1, 3, '2020-10-07 08:23:19.120', '2020-10-07 09:23:19.120');