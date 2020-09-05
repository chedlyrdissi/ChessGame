import { Component, Input } from '@angular/core';
import { PieceColor } from '../piece-color.enum';
import { ChessPiece, PieceWatcher } from '../piece.interface';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.css']
})
export class BishopComponent implements ChessPiece {

  @Input() pieceColor;
  @Input() boardService;

  isBlack(): boolean {
    return this.pieceColor === PieceColor.Black;
  }

  isWhite(): boolean {
    return this.pieceColor === PieceColor.White;
  }

  possibleSteps(row: number, column: number): {row: number, column: number}[] {
    let steps = [];
    for(let i=0; i<8; i++) {
      // right steps
        // bottom
      if (row+i < 8 && column+i < 8) {
        steps.push({row: row+i, column: column+i});
      }          
        // top
      if (row+i < 8 && column-i >= 0) {
        steps.push({row: row+i, column: column-i});
      }
      // left steps
        // bottom
      if (row-i >= 0 && column+i < 8) {
        steps.push({row: row-i, column: column+i});
      }          
        // top
      if (row-i >= 0 && column-i >= 0) {
        steps.push({row: row-i, column: column-i});
      }
    }
    return steps;
  }
}
