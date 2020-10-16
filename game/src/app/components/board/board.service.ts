import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';


class ActiveGameData {
  id: number;
  whitePlayer?: string;
  blackPlayer?: string;
  currentPlayer?: string;
  currentRow?: number;
  currentCol?: number;
  nextRow?: number;
  nextCol?: number;
}

@Injectable()
export class BoardService {

  gameData: ActiveGameData;
  gameBoard: BoardCell[][];
  possibleSteps: {row: number, column: number}[] = [];
  currentPlayer: PieceColor = PieceColor.White;
  selected: BoardCell = null;
  check: boolean;
  checkMate: boolean;

  constructor(private httpClient: HttpClient) {
    this.check = false;
    this.checkMate = false;
    this.gameBoard = START_TABLE;
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
        let kings = findKings(this.gameBoard);
        this.check = false;

        // getting to this point means that ally king is safe
        // all there's to do is to do is check if ennemy king is checked or checkmated
        // you need to parse throught all ally pieces to see if ennemy king is checked if ennemy king is checked => notify
        this.check = kingCheck(this.currentPlayer, this.gameBoard);

        // parse through all ennemy pieces to see if they can move, if they can't it's checkmate => game over
        this.checkMate = checkMate(this.currentPlayer, this.gameBoard);
        
        // switch players
        this.switchPlayer();
      }
      // deselect, clean up
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
      // can't move unless the ally king will be safe
      // const start = new Date(); 
      for(let step of this.possibleSteps) {       
        if(!checksKing(
          row,
          column,
          this.gameBoard,
          findSpecificKing(this.selected.c, findKings(this.gameBoard)),
          step.row,
          step.column)) {

          safeSteps.push(step);
        }
      }
      // const end = new Date(); 
      // console.log('Elapsed time during the steps search: '+ (end - start));
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

  getMove(): void {
    this.httpClient.get<ActiveGameData>('http://127.0.0.1:5000/game/'+this.gameData.id)
      .subscribe((data) => {
        console.log(data);
        this.gameData = data;
      })
  }
}

function findSpecificKing(color: PieceColor, kings: BoardCell[]): BoardCell {
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

/**
* this function finds the kings on the board
**/
function findKings(gameBoard: BoardCell[][]): BoardCell[] {
  let piece;
  let kings = [];
  // find ennemy king
  for(let r=0; r<8; r++) {
    for(let c=0; c<8; c++) {
      piece = gameBoard[r][c];
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

/**
* this function returns true if there's a checkmate on the board
**/
function checkMate(currentPlayer: PieceColor, board: BoardCell[][]): boolean {
  let br, bc, piece, posSteps, step;
  let ennemyColor = (currentPlayer === PieceColor.White) ? PieceColor.Black: PieceColor.White;
  for(br = 0; br<8; br++) {
    for(bc = 0; bc<8; bc++) {
      piece = board[br][bc];
      if(piece && piece.p && piece.c !== currentPlayer) {
        posSteps = ControllerMap[piece.p] ? ControllerMap[piece.p](br, bc, board) : [];
        for(step of posSteps) {
          if(!checksKing(br, bc, board, findSpecificKing(ennemyColor, findKings(board)), step.row, step.column)) {
            return false;
          }
        }
      }      
    }
  }
  return true;
}

function kingCheck(currentPlayer: PieceColor, board: BoardCell[][]): boolean {
  let br, bc, piece, posSteps, step;  
  let ennemyColor = (currentPlayer === PieceColor.White) ? PieceColor.Black: PieceColor.White;
  for(br = 0; br<8; br++) {
    for(bc = 0; bc<8; bc++) {
      piece = board[br][bc];
      if(piece && piece.p && piece.c === currentPlayer) {
        posSteps = ControllerMap[piece.p] ? ControllerMap[piece.p](br, bc, board) : [];
        for(step of posSteps) {
          if(checksKing(br, bc, board, findSpecificKing(ennemyColor, findKings(board)), step.row, step.column)) {
            return true;
          }
        }
      }      
    }
  }
  return false;
}
/**
* this function returns true if the ally king is checked
**/
function checksKing(row: number, column: number, board: BoardCell[][], allyKing: BoardCell, nextRow: number, nextColumn: number): boolean { // TODO implement
  let boardClone = copyBoard(board);
  let buff;
  let posBuf;
  const ennemyColor = (allyKing.c === PieceColor.White) ? PieceColor.Black: PieceColor.White;
  // move piece
  boardClone[nextRow][nextColumn] = boardClone[row][column];
  boardClone[row][column] = {};
  if(boardClone[nextRow][nextColumn].p === PieceName.King) {
    allyKing = findSpecificKing(allyKing.c, findKings(boardClone));
  }
  // check safety
  // parse through all ennemy pieces and check if ally king is a feeding possibility
  for(let br=0; br<8; br++) {
    for(let bc=0; bc<8; bc++) {
      buff = boardClone[br][bc];
      if(buff && buff.p && buff.c !== allyKing.c) { // found ennemy piece
        const debug = buff.p === PieceName.Queen;        
        posBuf = ControllerMap[buff.p] ? ControllerMap[buff.p](br, bc, boardClone) : [];
        let cond = posBuf.filter((elem)=>{
          return allyKing.row === elem.row && allyKing.col === elem.column;
        });
        if(cond.length > 0) {
          // ally king checked
          return true;
        }
      } else {
      
      }
    }
  }
  return false;
}

/**
* this function makes a copy of the board
**/
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

// const START_TABLE: BoardCell[][] = [
//   [{c:b,p:king}, {}, {}, {}, {}, {}, {},{c:w,p:rook}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true}],
//   [{c:w,p:rook},{c:w,p:knight},{c:w,p:bishop},{c:w,p:queen},{c:w,p:king},{c:w,p:bishop},{c:w,p:knight},{c:w,p:rook}]
// ];

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
