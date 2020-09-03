import { PieceColor } from '../pieces/piece-color.enum';
import { PieceName } from '../pieces/pieces-names.enum';

export class BoardService {

  gameBoard = START_TABLE;

  selected: BoardCell;

  constructor() {}

  cellClicked(row: number, column: number): void {
    if (!this.gameBoard[row][column].p) {
      console.log('empty cell');
    } else {
      console.log('cell ('+row+','+column+') occupied by '+this.gameBoard[row][column].c+' '+this.gameBoard[row][column].p);
    }
    this.selected = this.gameBoard[row][column];
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
