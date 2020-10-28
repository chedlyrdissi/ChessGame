import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';

import { SingleplayerController } from './singleplayer.controller';
import { MultiplayerController } from './multiplayer.controller';
import { AbstractController, BoardCell } from './abstractplayer.controller';

@Injectable()
export class BoardService {

  controller: AbstractController;

  constructor(private httpClient: HttpClient) {
    this.controller = new MultiplayerController(httpClient);
  }

  getGameId(): number {
    return this.controller.gameId;
  }

  setGameId(id: number): void {
    this.controller.gameId = id;
  }

  cellClicked(row: number, column: number): void {
    this.controller.cellClicked(row, column);
  }

  getGameBoard(): BoardCell[][] {
    return this.controller.gameBoard;
  }

  getPossibleSteps(): {row: number, column: number}[] {
    return this.controller.possibleSteps;
  }

  getMove(): void {
    this.controller.getMove();
  }
}
