import { PieceColor } from './cell/pieces/piece-color.enum';
import { PieceName } from './cell/pieces/pieces-names.enum';
import { BishopController } from './cell/pieces/bishop/bishop.controller';

export class BoardService {

  gameBoard = START_TABLE;
  possibleSteps: {row: number, column: number}[] = [];

  selected: BoardCell = null;

  cellClicked(row: number, column: number): void {
    if( this.selected && this.gameBoard[row][column] === this.selected) {
      this.selected = null;
      this.possibleSteps = [];
    } else if( this.selected
      && (row != this.selected.row || column != this.selected.col)
      && (this.selected.c !== this.gameBoard[row][column].c) ) {
      // move piece
      this.gameBoard[row][column] = {c: this.selected.c,p: this.selected.p};
      this.gameBoard[this.selected.row][this.selected.col] = {};
      // deselect
      this.selected = null;
      this.possibleSteps = [];
    } else if (this.gameBoard[row][column].p) {
      // set selected piece
      this.selected = this.gameBoard[row][column];
      this.selected.row = row;
      this.selected.col = column;
      this.possibleSteps = this.selected.p === bishop ? BishopController(row, column, this.gameBoard) : [];
    }
  }

  setSteps(possibleSteps: {row: number, column: number}[]): void {
    console.log('setting steps');
    this.possibleSteps = possibleSteps;
  }
}

const b = PieceColor.Black;
const w = PieceColor.White;
const pawn = PieceName.Pawn;
const knight = PieceName.Knight;
const rook = PieceName.Rook;
const bishop = PieceName.Bishop;
const king = PieceName.King;
const queen = PieceName.Queen;

class BoardCell {
  c?: PieceColor;
  p?: PieceName;
  row?: number;
  col?: number;
}

const START_TABLE: BoardCell[][] = [
  [{c:b,p:rook},{c:b,p:knight},{c:b,p:bishop},{c:b,p:queen},{c:b,p:king},{c:b,p:bishop},{c:b,p:knight},{c:b,p:rook}],
  [{c:b,p:pawn},{c:b,p:pawn},{c:b,p:pawn},{c:b,p:pawn},{c:b,p:pawn},{c:b,p:pawn},{c:b,p:pawn},{c:b,p:pawn}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{c:w,p:pawn},{c:w,p:pawn},{c:w,p:pawn},{c:w,p:pawn},{c:w,p:pawn},{c:w,p:pawn},{c:w,p:pawn},{c:w,p:pawn}],
  [{c:w,p:rook},{c:w,p:knight},{c:w,p:bishop},{c:w,p:queen},{c:w,p:king},{c:w,p:bishop},{c:w,p:knight},{c:w,p:rook}]
];
