import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';

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

  constructor() {}

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
      if(this.validPlayer(row, column)) {        
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
  }

  abstract validPlayer(row: number, column: number): boolean;

  switchPlayer(): void {}
 
  abstract getMove(): void;

  abstract movePiece(row: number, column: number): void;

  setCheck(checkEventEmitter: EventEmitter<void>): void {
    this.check = checkEventEmitter;
  }

  setCheckMate(checkMateEventEmitter: EventEmitter<void>): void {
    this.checkMate = checkMateEventEmitter;
  }

  resetGame(): void {}

  abstract endGame(): void;

  promitionExists(row: number, column: number): boolean {
    return this.gameBoard[row][column].p === PieceName.Pawn
      && (this.gameBoard[row][column].c === PieceColor.White && row === 0 
        || this.gameBoard[row][column].c === PieceColor.Black && row === 7);
  }

  destructor(): void {}
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

/**
* this function returns true if player's king is checked
**/
export function boardKingsCheck(player: PieceColor, board: BoardCell[][]): boolean {
  let br, bc, piece, posSteps, step;  
  const kingPos = findSpecificKing((player === PieceColor.White)?PieceColor.Black:PieceColor.White, findKings(board));
  for(br = 0; br<8; br++) {
    for(bc = 0; bc<8; bc++) {
      piece = board[br][bc];
      if(piece && piece.p && piece.c === player) {
        posSteps = ControllerMap[piece.p] ? ControllerMap[piece.p](br, bc, board) : [];
        for(step of posSteps) {
          // if(checksKing(br, bc, board, findSpecificKing(player, findKings(board)), step.row, step.column)) {
          if(step.row === kingPos.row && step.column === kingPos.col) {
            return true;
          }
        }
      }      
    }
  }
  return false;
}
/**
* this function returns true if the ally king will be checked
**/
export function checksKing(row: number, column: number, board: BoardCell[][], allyKing: BoardCell, nextRow: number, nextColumn: number): boolean { // TODO implement
  let boardClone = copyBoard(board);
  let buff;
  let posBuf;
  let cond;
  const ennemyColor = (allyKing.c === PieceColor.White) ? PieceColor.Black: PieceColor.White;
  // move piece
  boardClone[nextRow][nextColumn] = boardClone[row][column];
  boardClone[row][column] = {};
  // if the king moves his location needs to be updated
  if(boardClone[nextRow][nextColumn].p === PieceName.King) {
    allyKing = findSpecificKing(allyKing.c, findKings(boardClone));
  }
  // check safety
  // parse through all ennemy pieces and check if ally king is a feeding possibility
  for(let br=0; br<8; br++) {
    for(let bc=0; bc<8; bc++) {
      buff = boardClone[br][bc];
      if(buff && buff.p && buff.c !== allyKing.c) { // found ennemy piece
        posBuf = ControllerMap[buff.p] ? ControllerMap[buff.p](br, bc, boardClone) : [];
        cond = posBuf.filter((elem)=>{
          return allyKing.row === elem.row && allyKing.col === elem.column;
        });
        if(cond.length > 0) {
          // ally king checked
          return true;
        }
      }
    }
  }
  return false;
}

/**
* this function makes a copy of the board
**/
export function copyBoard(board: BoardCell[][]): BoardCell[][] {
  return board.map((row)=>{return row.map((cell)=>{
    return {
      c: cell.c,
      p: cell.p,
      f: cell.f
    };
  })});
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

// export const START_TABLE: BoardCell[][] = [
//   [{c:b,p:rook,f:true},{c:b,p:knight,f:true},{c:b,p:bishop,f:true},{c:b,p:queen,f:true},{c:b,p:king,f:true},{c:b,p:bishop,f:true},{c:b,p:knight,f:true},{c:b,p:rook,f:true}],
//   [{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true}],
//   [{c:w,p:rook,f:true},{c:w,p:knight,f:true},{c:w,p:bishop,f:true},{c:w,p:queen,f:true},{c:w,p:king,f:true},{c:w,p:bishop,f:true},{c:w,p:knight,f:true},{c:w,p:rook,f:true}]
// ];


export const START_TABLE: BoardCell[][] = [
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{c:w,p:pawn,f:true}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {c:b,p:king,f:true}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true}],
  [{c:w,p:rook,f:true},{c:w,p:knight,f:true},{c:w,p:bishop,f:true},{c:w,p:queen,f:true},{c:w,p:king,f:true},{c:w,p:bishop,f:true},{c:w,p:knight,f:true},{c:w,p:rook,f:true}]
];

