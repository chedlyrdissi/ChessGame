import { Component, Input } from '@angular/core';
import { PieceColor } from '../piece-color.enum';
import { ChessPiece } from '../piece.interface';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class KnightComponent implements ChessPiece {

  @Input() pieceColor = PieceColor.White;

  isBlack(): boolean {
    return this.pieceColor === PieceColor.Black;
  }

  isWhite(): boolean {
    return this.pieceColor === PieceColor.White;
  }
}
