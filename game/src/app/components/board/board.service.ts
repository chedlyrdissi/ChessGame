import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';
import { Router } from '@angular/router';

import { SingleplayerController } from './singleplayer.controller';
import { MultiplayerController } from './multiplayer.controller';
import { AbstractController, BoardCell } from './abstractplayer.controller';

@Injectable()
export class BoardService {

  controller: AbstractController;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.controller = new MultiplayerController(httpClient);
  }

  getGameId(): number {
    return this.controller.gameId;
  }

  setGameId(id: number): void {
    this.controller.gameId = id;
  }

  endGame(): void {
    this.httpClient.post("http://127.0.0.1:5000/finished-games", {
            id: this.getGameId()
          }).subscribe((data: {gameId: number}) => {
            console.log(data);
            this.router.navigate(['/finished']);
           });
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

  setCheck(checkEventEmitter: EventEmitter<void>): void {
    this.controller.setCheck(checkEventEmitter);
  }

  setCheckMate(checkMateEventEmitter: EventEmitter<void>): void {
    this.controller.setCheckMate(checkMateEventEmitter);
  }
}
