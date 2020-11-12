import { Injectable } from '@angular/core';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';

import { AbstractController, ActiveGameData, findKings, boardKingsCheck, checkMate, START_TABLE, copyBoard } from './abstractplayer.controller';

@Injectable()
export class SingleplayerController extends AbstractController {

  constructor() {
    super();
    this.gameBoard = copyBoard(START_TABLE);
    this.currentPlayer = PieceColor.White;
  }

  validPlayer(row: number, column: number): boolean {
    return this.currentPlayer === this.gameBoard[row][column].c;
  }
  
  switchPlayer(): void {
    if(this.currentPlayer === PieceColor.White) {
      this.currentPlayer = PieceColor.Black;
    } else if(this.currentPlayer === PieceColor.Black) {
      this.currentPlayer = PieceColor.White;
    }
  }

  resetGame(): void {
    this.gameBoard = copyBoard(START_TABLE);
    this.currentPlayer = PieceColor.White;
  }

  getMove(): void {}

  movePiece(row: number, column: number): void {
    this.gameBoard[row][column] = {c: this.selected.c,p: this.selected.p};
    this.gameBoard[this.selected.row][this.selected.col] = {};

    if(this.promitionExists(row, column)) {
      this.gameBoard[row][column].p = PieceName.Queen;
    }
    
    // getting to this point means that ally king is safe
    // all there's to do is to do is check if ennemy king is checked or checkmated
    // you need to parse throught all ally pieces to see if ennemy king is checked if ennemy king is checked => notify
    if(boardKingsCheck(this.currentPlayer, this.gameBoard)) {
      this.check.next();
      // parse through all ennemy pieces to see if they can move, if they can't it's checkmate => game over
      if(checkMate(this.currentPlayer, this.gameBoard)) {
        this.checkMate.next();
      }
    }

    // switch players
    this.switchPlayer();
  }

  endGame(): void {
    alert('Game Over')
  }
}
