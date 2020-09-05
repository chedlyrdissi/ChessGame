import { Component, Input } from '@angular/core';
import { PieceColor } from '../piece-color.enum';
import { ChessPiece } from '../piece.interface';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']
})
export class KingComponent implements ChessPiece {

  @Input() pieceColor = PieceColor.White;

  constructor(private boardService: BoardService) {}

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
