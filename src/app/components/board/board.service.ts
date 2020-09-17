import { PieceColor } from './cell/pieces/piece-color.enum';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { ControllerMap } from './board-piece.controller';

export class BoardService {

  gameBoard: BoardCell[][];
  possibleSteps: {row: number, column: number}[] = [];
  currentPlayer: PieceColor = PieceColor.White;
  selected: BoardCell = null;
  check: boolean;

  constructor() {
    this.check = false;
    this.gameBoard = START_TABLE;
  }

  findKings(): BoardCell[] {
    let piece;
    let kings = [];
    // find ennemy king
    for(let r=0; r<8; r++) {
      for(let c=0; c<8; c++) {
        piece = this.gameBoard[r][c];
        if(piece && piece.p && piece.p === PieceName.King) { // cell occupied
          kings.push({row: r,col: c,c: piece.c,p: PieceName.King});
          if(kings.length === 2) {
            break;
          }
        }
      }
      if(kings.length === 2) {
        break;
      }
    }
    return kings;
  }

  findSpecificKing(color: PieceColor, kings: BoardCell[]): BoardCell {
    if(kings.length !== 2) throw "parameter error, the array must have 2 kings";
    let king1 = kings[0];
    let king2 = kings[1];
    if(king1.c === king2.c) throw "the array must contain 2 different kings";
    if(king1.c === color) {
      return king1;
    } else if(king2.c === color) {
      return king2;
    } else {
      throw "no king of specific color found";
    }
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
        
        let pos;
        // find ennemy king
        let kings = this.findKings();
        this.check = false;
        /*
        // TODO moving can only put ennemy king in check
        if(kings.length === 2) { // check for checks
          for(let r=0; r<8; r++) {
            for(let c=0; c<8; c++) {
              piece = this.gameBoard[r][c];
              if(piece && piece.p && piece.c === currentPlayer) { // cell occupied
                console.log("piece "+JSON.stringify(piece)+" row "+r+" col "+c);
                pos = ControllerMap[piece.p](r,c,this.gameBoard);
                console.log("possibilities");
                console.log(pos);
                const cond = pos.filter((elem) => {return elem.row === ennemyKing.row && elem.column === ennemyKing.column}).length > 0;
                console.log(cond);
                if(cond) {
                  this.check = true;
                }
              }
            }
          }
        } else { // error  
        }
        */
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
      // get possible moves
      this.possibleSteps = ControllerMap[this.selected.p] ? ControllerMap[this.selected.p](row, column, this.gameBoard) : [];
      // filter possibilites: remove steps that lead to current king checks
      let safeSteps = [];

      for(let step of this.possibleSteps) {       
        if(!checksKing(
          row,
          column,
          this.gameBoard,
          this.findSpecificKing(this.selected.c, this.findKings()),
          step.row,
          step.column)) {

          safeSteps.push(step);
        }
      }
      this.possibleSteps = safeSteps;
    }
  }

  private switchPlayer(): void {
    if(this.currentPlayer === PieceColor.White) {
      this.currentPlayer = PieceColor.Black;
    } else if(this.currentPlayer === PieceColor.Black) {
      this.currentPlayer = PieceColor.White;
    }
  }

  getClone() {
    return copyBoard(this.gameBoard);
  }
}

function checksKing(row: number, column: number, board: BoardCell[][], allyKing: BoardCell, nextRow: number, nextColumn: number): boolean { // TODO implement
  let boardClone = copyBoard(board);
  let buff;
  let posBuf;
  const ennemyColor = (allyKing.c === PieceColor.White) ? PieceColor.Black: PieceColor.White;
  // move piece
  boardClone[nextRow][nextColumn] = boardClone[row][column];
  // check safety
  // parse through all ennemy pieces and check if ally king is a feeding possibility
  for(let br=0; br<8; br++) {
    for(let bc=0; bc<8; bc++) {
      buff = boardClone[br][bc];
      if(buff && buff.p && buff.c !== allyKing.c) { // found ennemy piece
        posBuf = ControllerMap[buff.p] ? ControllerMap[buff.p](br, bc, boardClone) : [];
        let cond;
        if(buff.p === PieceName.King) { // king has to be treated differently because he moves
          cond = posBuf.filter((elem)=>{return allyKing.row === elem.row && allyKing.col === elem.column;});
        } else {
          cond = posBuf.filter((elem)=>{return allyKing.row === elem.row && allyKing.col === elem.column;});
        }
        if(cond.length > 0) {
          // ally king checked
          console.log('ally king checked');
          return true;
        }
      } else {
      
      }
    }
  }
  return false;
}

function copyBoard(board: BoardCell[][]): BoardCell[][] {
  let clone: BoardCell[][];
  clone = [];
  let piece: BoardCell;
  for(let r=0; r<8; r++) {
    clone.push([]);
    for(let c=0; c<8; c++) {
      piece = {};
      if(board[r][c].c !== undefined) {
        piece.c = board[r][c].c;
      }
      if(board[r][c].p !== undefined) {
        piece.p = board[r][c].p;
      }
      if(board[r][c].f !== undefined) {
        piece.f = board[r][c].f;
      }
      clone[r][c] = piece;
    }
  }
  return clone;
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
