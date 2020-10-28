import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BoardService } from './board.service';
import { BoardCell } from './abstractplayer.controller';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  constructor(private boardService: BoardService,  private actRoute: ActivatedRoute) {
    // boardService.gameData = {id: this.actRoute.snapshot.params['gameId']};
    this.actRoute.params.subscribe((params) => {
      this.boardService.setGameId(params['gameId']);
      this.boardService.getMove();
    });
  }

  cellClicked = (row: number, column: number) => {
    this.boardService.cellClicked(row, column);    
  }

  getBoardGame(): BoardCell[][] {
    return this.boardService.getGameBoard();
  }
  
  isSelected(cell): boolean {
    return Object.is(cell, this.boardService.controller.selected);
  }

  hasCheck(): boolean {
    return this.boardService.controller.check;
  }

  hasCheckMate(): boolean {
    return this.boardService.controller.checkMate;
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
}
