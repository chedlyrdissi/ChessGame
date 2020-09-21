import { PieceColor } from '../../pieces/piece-color.enum';
import { PieceName } from '../../pieces/pieces-names.enum';

export class Cell {
  row: number;
  column: number;
  color: PieceColor;
  piece: PieceName;

  constructor(
    row: number,
    column: number,
    color: PieceColor,
    piece: PieceName
  ) {
    this.row = row;
    this.column = column;
    this.color = color;
    this.piece = piece;
  }
  
  getRow(): number {
    return this.row;
  }

  getColumn(): number {
    return this.column;
  }

  getColor(): PieceColor {
    return this.color;
  }

  isEmpty(): boolean {
    return !this.piece; 
  }

  getPiece(): PieceName {
    return this.piece;
  }
}
