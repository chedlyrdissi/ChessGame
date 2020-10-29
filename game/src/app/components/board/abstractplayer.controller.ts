import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PieceColor } from './cell/pieces/piece-color.enum';
import { ControllerMap } from './board-piece.controller';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { PieceName, pawn, knight, rook, bishop, king, queen } from './cell/pieces/pieces-names.enum';


export class ActiveGameData {
  id: number;
  whitePlayer?: string;
  blackPlayer?: string;
  currentPlayer?: string;
  board?: BoardCell[][];
}

@Injectable()
export abstract class AbstractController {

  gameId: number;
  gameData: ActiveGameData;
  gameBoard: BoardCell[][];
  possibleSteps: {row: number, column: number}[] = [];
  currentPlayer: PieceColor;
  selected: BoardCell = null;
  
  check: EventEmitter<void>;
  checkMate: EventEmitter<void>;

  constructor(protected httpClient: HttpClient) {}

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
        this.movePiece(row, column);
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

  switchPlayer(): void {
  }
 
  abstract getMove(): void;

  abstract movePiece(row: number, column: number): void;

  setCheck(checkEventEmitter: EventEmitter<void>): void {
    this.check = checkEventEmitter;
  }

  setCheckMate(checkMateEventEmitter: EventEmitter<void>): void {
    this.checkMate = checkMateEventEmitter;
  }
}

export function findSpecificKing(color: PieceColor, kings: BoardCell[]): BoardCell {
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
export function findKings(gameBoard: BoardCell[][]): BoardCell[] {
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
export function checkMate(currentPlayer: PieceColor, board: BoardCell[][]): boolean {
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

export function kingCheck(currentPlayer: PieceColor, board: BoardCell[][]): boolean {
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
export function checksKing(row: number, column: number, board: BoardCell[][], allyKing: BoardCell, nextRow: number, nextColumn: number): boolean { // TODO implement
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
export function copyBoard(board: BoardCell[][]): BoardCell[][] {
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

export const b = PieceColor.Black;
export const w = PieceColor.White;

export class BoardCell {
  c?: PieceColor;
  p?: PieceName;
  row?: number;
  col?: number;
  f?: boolean; // first move
}

export const START_TABLE: BoardCell[][] = [
  [{c:b,p:rook},{c:b,p:knight},{c:b,p:bishop},{c:b,p:queen},{c:b,p:king},{c:b,p:bishop},{c:b,p:knight},{c:b,p:rook}],
  [{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true}],
  [{c:w,p:rook},{c:w,p:knight},{c:w,p:bishop},{c:w,p:queen},{c:w,p:king},{c:w,p:bishop},{c:w,p:knight},{c:w,p:rook}]
];
