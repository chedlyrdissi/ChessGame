import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';

import { AbstractController, ActiveGameData, kingCheck, checkMate } from './abstractplayer.controller';

@Injectable()
export class MultiplayerController extends AbstractController {

  constructor(httpClient: HttpClient) {
    super(httpClient);
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
      .subscribe(this.updateDataFromResp)
  }

  updateDataFromResp = (data: ActiveGameData) => {
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

    // parse board for check
    if(kingCheck(this.currentPlayer, this.gameBoard)) {
      this.check.next();
    }

    // parse board for checkmate
    // parse through all ennemy pieces to see if they can move, if they can't it's checkmate => game over
    if(checkMate(this.currentPlayer, this.gameBoard)) {
      this.checkMate.next();
    }
  };

  movePiece(row: number, column: number): void {
    console.log({
            row: row,
            column: column,
            piece: this.selected.p,
            color: this.selected.c,
            first_move: this.selected.f
          });
    this.httpClient.post('http://127.0.0.1:5000/game/'+this.gameId, {
            previous_row: this.selected.row,
            previous_col: this.selected.col,
            row: row,
            column: column,
            piece: this.selected.p,
            color: this.selected.c,
            // first_move: this.selected.f
            first_move: this.selected.f? 'True': 'False'
          }, {
            headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
          }).subscribe(this.updateDataFromResp);
  }
}
