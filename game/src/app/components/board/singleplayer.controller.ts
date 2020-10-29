import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';

import { AbstractController, ActiveGameData, findKings, kingCheck, checkMate, START_TABLE } from './abstractplayer.controller';

@Injectable()
export class SingleplayerController extends AbstractController {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.gameBoard = START_TABLE;
  }

  switchPlayer(): void {
    if(this.currentPlayer === PieceColor.White) {
      this.currentPlayer = PieceColor.Black;
    } else if(this.currentPlayer === PieceColor.Black) {
      this.currentPlayer = PieceColor.White;
    }
  }

  getMove(): void { 
  }

  movePiece(row: number, column: number): void {
    this.gameBoard[row][column] = {c: this.selected.c,p: this.selected.p};
    this.gameBoard[this.selected.row][this.selected.col] = {};

    // getting to this point means that ally king is safe
    // all there's to do is to do is check if ennemy king is checked or checkmated
    // you need to parse throught all ally pieces to see if ennemy king is checked if ennemy king is checked => notify
    if(kingCheck(this.currentPlayer, this.gameBoard)) {
      this.check.next();
    }

    // parse through all ennemy pieces to see if they can move, if they can't it's checkmate => game over
    if(checkMate(this.currentPlayer, this.gameBoard)) {
      this.checkMate.next();
    }
    // switch players
    this.switchPlayer();
  }
}
