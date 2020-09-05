import { PieceColor } from '../pieces/piece-color.enum';
import { PieceName } from '../pieces/pieces-names.enum';
import { PieceWatcher } from '../pieces/piece.interface';

export class BoardService extends PieceWatcher {

  gameBoard = START_TABLE;

  selected: BoardCell;

  cellClicked(row: number, column: number): void {
    // if (!this.gameBoard[row][column].p) {
     //  console.log('empty cell');
    // } else {
      // console.log('cell ('+row+','+column+') occupied by '+this.gameBoard[row][column].c+' '+this.gameBoard[row][column].p);
    // }

    // console.log(this.gameBoard[row][column] !== {});

    if( this.selected && (row != this.selected.row || column != this.selected.col) ) {
      // move piece
      this.gameBoard[row][column] = {c: this.selected.c,p: this.selected.p};
      this.gameBoard[this.selected.row][this.selected.col] = {};
      // deselect
      this.selected = undefined;
    } else if (this.gameBoard[row][column].p) {
      // set selected piece
      this.selected = this.gameBoard[row][column];
      this.selected.row = row;
      this.selected.col = column;
    }
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
