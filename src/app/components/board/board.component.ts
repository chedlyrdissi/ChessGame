import { Component, Input } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  constructor(private boardService: BoardService) {}

  cellClicked = (row: number, column: number) => {
    this.boardService.cellClicked(row, column);    
  }

  getBoardGame() {
    return this.boardService.gameBoard;
  }
  
  isSelected(cell): boolean {
    return Object.is(cell, this.boardService.selected);
  }

  hasCheck(): boolean {
    return this.boardService.check;
  }

  hasCheckMate(): boolean {
    return this.boardService.checkMate;
  }

  isPossibleStep(row: number, col: number): boolean {
    for(let step of this.boardService.possibleSteps){
      if(step.row === row && step.column === col) {
        return true;
      }
    }
  }
}
