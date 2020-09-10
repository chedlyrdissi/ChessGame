import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
  }

  cellClicked = (row: number, column: number) => {
    this.boardService.cellClicked(row, column);    
  }

  getBoardGame() {
    return this.boardService.gameBoard;
  }
  
  isSelected(cell): boolean {
    return Object.is(cell, this.boardService.selected);
  }

  isPossibleStep(row: number, col: number): boolean {
    for(let step of this.boardService.possibleSteps){
      if(step.row === row && step.column === col) {
        return true;
      }
    }
  }
}
