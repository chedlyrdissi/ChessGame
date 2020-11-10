import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';

import { AbstractController, ActiveGameData, kingCheck, checkMate } from './abstractplayer.controller';

@Injectable()
export class MultiplayerController extends AbstractController {

  private updateHandler;

  constructor(httpClient: HttpClient, logInService: LogInService, private router: Router) {
    super(httpClient, logInService);
    this.updateHandler = setInterval(this.getMove, 1000);
  }

  destructor() {
    clearInterval(this.updateHandler);
  }

  switchPlayer(): void {
    if(this.currentPlayer === PieceColor.White) {
      this.currentPlayer = PieceColor.Black;
    } else if(this.currentPlayer === PieceColor.Black) {
      this.currentPlayer = PieceColor.White;
    }
  }

  getMove = (): void => {
    this.httpClient.get<ActiveGameData>('http://127.0.0.1:5000/game/'+this.gameId)
      .subscribe(this.updateDataFromResp, (error: HttpErrorResponse) => {
        console.log(error);
        alert('game does not exist');
        this.router.navigate(['/', 'finished']);
      })
  }

  updateDataFromResp = (data: ActiveGameData) => {
    // console.log(data);
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
    
    // TODO inspect this section
    // const c1 = checkMate(this.currentPlayer, this.gameBoard);
    const c2 = checkMate((this.currentPlayer === PieceColor.White) ? PieceColor.Black: PieceColor.White, this.gameBoard);
    // console.log('with current');
    // console.log(c1);
    // console.log('with ennemy');
    // console.log(c2);
    if(c2) {
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
