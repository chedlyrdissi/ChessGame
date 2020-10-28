import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';

import { AbstractController, ActiveGameData } from './abstractplayer.controller';

@Injectable()
export class MultiplayerController extends AbstractController {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.check = false;
    this.checkMate = false;
    // this.gameBoard = START_TABLE;
  }

  switchPlayer(): void {
    if(this.currentPlayer === PieceColor.White) {
      this.currentPlayer = PieceColor.Black;
    } else if(this.currentPlayer === PieceColor.Black) {
      this.currentPlayer = PieceColor.White;
    }
  }

  getMove(): void {
    this.httpClient.get<ActiveGameData>('http://127.0.0.1:5000/game/'+this.gameId)
      .subscribe((data) => {
        console.log(data);
        this.gameData = data;
        if(this.gameData.currentPlayer === this.gameData.whitePlayer) {
          this.currentPlayer = PieceColor.White;
        } else if(this.gameData.currentPlayer === this.gameData.blackPlayer) {
          this.currentPlayer = PieceColor.Black;
        } else {
          throw Error('unknown player')
        }
        // delete this.gameData.board;
        this.gameBoard = data.board;
      })
  }

  movePiece(row: number, column: number): void {
    this.httpClient.post('http://127.0.0.1:5000/game/'+this.gameId, {
            row: row,
            column: column,
            piece: this.selected.p,
            color: this.selected.c,
            first_move: this.selected.f
          }, {
            headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
          }).subscribe((data) => {
            console.log(data);
           });
  }
}
