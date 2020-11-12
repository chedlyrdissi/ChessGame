import { Component, Input, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from './board.service';
import { BoardCell } from './abstractplayer.controller';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy {

  // @Input() solo: boolean = false;
  check: EventEmitter<void>;
  checkMate: EventEmitter<void>;
  gameOver: boolean = false;

  constructor(private boardService: BoardService,  private actRoute: ActivatedRoute) {
    // boardService.gameData = {id: this.actRoute.snapshot.params['gameId']};
    this.actRoute.params.subscribe((params) => {
      this.boardService.setGameId(params['gameId']);
      this.boardService.getMove();
    });
    
    this.check = new EventEmitter<void>();
    this.check.subscribe(() => {console.log('check');});
    boardService.setCheck(this.check);

    this.checkMate = new EventEmitter<void>();
    this.checkMate.subscribe(() => {
      console.log('checkMate');
      this.gameOver = true;
      this.boardService.endGame();
    });
    boardService.setCheckMate(this.checkMate);
  }

  ngOnDestroy(): void {
    this.boardService.destructor();
  }

  cellClicked = (row: number, column: number) => {
    this.boardService.cellClicked(row, column);    
  }

  getBoardGame(): BoardCell[][] {
    return this.boardService.getGameBoard();
  }
  
  isSelected(row: number, column: number): boolean {
    // return Object.is(cell, this.boardService.controller.selected);
    return this.boardService?.controller?.selected?.row === row && this.boardService?.controller?.selected?.col === column;
  }

  isPossibleStep(row: number, col: number): boolean {
    for(let step of this.boardService.getPossibleSteps()){
      if(step.row === row && step.column === col) {
        return true;
      }
    }
  }

  move(): void {
    this.boardService.getMove();
  }

  getGameId(): number {
    return this.boardService.getGameId();
  }

  getCurrentPlayerName(): string {
    return this.boardService.controller.gameData.currentPlayer;
  }

  hasCurrentPlayerName(): boolean {
    return this.boardService.controller !== undefined && this.boardService.controller !== null 
    && this.boardService.controller.gameData !== undefined && this.boardService.controller.gameData !== null 
    && this.boardService.controller.gameData.currentPlayer !== undefined 
    && this.boardService.controller.gameData.currentPlayer !== null;
  }

  getWhitePlayerName(): string {
    return this.boardService.controller.gameData.whitePlayer;
  }

  getBlackPlayerName(): string {
    return this.boardService.controller.gameData.blackPlayer;
  }

  hasWhitePlayerName(): boolean {
    return this.boardService.controller !== undefined && this.boardService.controller !== null 
    && this.boardService.controller.gameData !== undefined && this.boardService.controller.gameData !== null 
    && this.boardService.controller.gameData.whitePlayer !== undefined 
    && this.boardService.controller.gameData.whitePlayer !== null;
  }

  hasBlackPlayerName(): boolean {
    return this.boardService.controller !== undefined && this.boardService.controller !== null 
    && this.boardService.controller.gameData !== undefined && this.boardService.controller.gameData !== null 
    && this.boardService.controller.gameData.blackPlayer !== undefined 
    && this.boardService.controller.gameData.blackPlayer !== null;
  }

  resetGame(): void {
    this.boardService.resetGame();
  }
}
