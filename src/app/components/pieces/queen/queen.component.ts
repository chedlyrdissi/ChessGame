import { Component, Input } from '@angular/core';
import { PieceColor } from '../piece-color.enum';
import { ChessPiece, PieceWatcher } from '../piece.interface';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements ChessPiece {

  @Input() pieceColor = PieceColor.White;

  constructor(private boardService: PieceWatcher) {}

  isBlack(): boolean {
    return this.pieceColor === PieceColor.Black;
  }

  isWhite(): boolean {
    return this.pieceColor === PieceColor.White;
  }
  
  possibleSteps(row: number, column: number): {row: number, column: number}[] {
    return null;
  }
}
