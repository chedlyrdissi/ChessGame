import { PieceColor } from './cell/pieces/piece-color.enum';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { ControllerMap } from './board-piece.controller';

export class BoardService {

  gameBoard = START_TABLE;
  possibleSteps: {row: number, column: number}[] = [];
  currentPlayer: PieceColor = PieceColor.White;
  selected: BoardCell = null;
  check: boolean;

  constructor() {
    this.check = false;
  }

  cellClicked(row: number, column: number): void {
    if( this.selected && this.gameBoard[row][column] === this.selected) {
      // selecting same piece => deselect
      this.selected = null;
      this.possibleSteps = [];
    } else if( this.selected
      && (row != this.selected.row || column != this.selected.col)
      && (this.selected.c !== this.gameBoard[row][column].c) ) {
      // move piece if possible
      if(this.possibleSteps.filter((elem) => {return elem.row === row && elem.column === column}).length > 0) {
        this.gameBoard[row][column] = {c: this.selected.c,p: this.selected.p};
        this.gameBoard[this.selected.row][this.selected.col] = {};
        // check for checks
        let piece;
        let pos;
        let ennemyPosition;
        this.check = false;
        // find ennemy king
        for(let r=0; r<8; r++) {
          for(let c=0; c<8; c++) {
            piece = this.gameBoard[r][c];
            if(piece && piece.p && piece.p === PieceName.King && piece.c !== this.currentPlayer) { // cell occupied
              ennemyPosition = {row: r,column: c};
              break;
            }
          }
          if(ennemyPosition) {
            break;
          }
        }
        if(ennemyPosition) { // check for checks
          for(let r=0; r<8; r++) {
            for(let c=0; c<8; c++) {
              piece = this.gameBoard[r][c];
              if(piece && piece.p) { // cell occupied
                pos = ControllerMap[piece.p](r,c,this.gameBoard);
                if(pos.filter((elem) => {return elem.row === ennemyPosition.row && elem.column === ennemyPosition.column}).length > 0) {
                  this.check = true;
                }
              }
            }
          }
        } else { // error  
        }
        // switch players
        this.switchPlayer();
      }
      // deselect
      this.selected = null;
      this.possibleSteps = [];
    } else if (this.gameBoard[row][column].p && this.gameBoard[row][column].c === this.currentPlayer) {
      // set selected piece
      this.selected = this.gameBoard[row][column];
      this.selected.row = row;
      this.selected.col = column;
      this.possibleSteps = ControllerMap[this.selected.p] ? ControllerMap[this.selected.p](row, column, this.gameBoard) : [];
    }
  }

  private switchPlayer(): void {
    if(this.currentPlayer === PieceColor.White) {
      this.currentPlayer = PieceColor.Black;
    } else if(this.currentPlayer === PieceColor.Black) {
      this.currentPlayer = PieceColor.White;
    }
  }
}

const b = PieceColor.Black;
const w = PieceColor.White;

class BoardCell {
  c?: PieceColor;
  p?: PieceName;
  row?: number;
  col?: number;
  f?: boolean; // first move
}

const START_TABLE: BoardCell[][] = [
  [{c:b,p:rook},{c:b,p:knight},{c:b,p:bishop},{c:b,p:queen},{c:b,p:king},{c:b,p:bishop},{c:b,p:knight},{c:b,p:rook}],
  [{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true}],
  [{c:w,p:rook},{c:w,p:knight},{c:w,p:bishop},{c:w,p:queen},{c:w,p:king},{c:w,p:bishop},{c:w,p:knight},{c:w,p:rook}]
];
