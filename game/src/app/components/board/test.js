// const BishopController = require('./cell/pieces/bishop/bishop.controller.ts');
function BishopController(row, column, board) {
  let steps = [];
  const color = board[row][column].c;
  // bottom
  // right  
  for(let i=1; i<8; i++) {
    if (row+i < 8 && column+i < 8 && (!board[row+i][column+i].p || board[row+i][column+i].p && board[row+i][column+i].c !== color)) {
      steps.push({row: row+i, column: column+i});
      if (board[row+i][column+i].p && board[row+i][column+i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // left
  for(let i=1; i<8; i++) {
    if (row+i < 8 && column-i >= 0 && (!board[row+i][column-i].p || board[row+i][column-i].p && board[row+i][column-i].c !== color)) {
      steps.push({row: row+i, column: column-i});
      if (board[row+i][column-i].p && board[row+i][column-i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // top
  // right
  for(let i=1; i<8; i++) {
    if (row-i >= 0 && column+i < 8 && (!board[row-i][column+i].p || board[row-i][column+i].p && board[row-i][column+i].c !== color)) {
      steps.push({row: row-i, column: column+i});
      if (board[row-i][column+i].p && board[row-i][column+i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // left
  for(let i=1; i<8; i++) {
    if (row-i >= 0 && column-i >= 0 && (!board[row-i][column-i].p || board[row-i][column-i].p && board[row-i][column-i].c !== color)) {
      steps.push({row: row-i, column: column-i});
      if (board[row-i][column-i].p && board[row-i][column-i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }

  return steps;
}
// const KingController = require('./cell/pieces/king/king.controller.ts');
function KingController(row, column, board) {
  let steps = [];
  const color = board[row][column].c;

  // righ
  if(row+1 < 8 && (!board[row+1][column].p || board[row+1][column].p && board[row+1][column].c !== board[row][column].c)) {
    steps.push({row: row+1, column: column});
  }
  // left
  if(row-1 >= 0 && (!board[row-1][column].p || board[row-1][column].p && board[row-1][column].c !== board[row][column].c)) {
    steps.push({row: row-1, column: column});
  }
  // bottom
  if(column+1 < 8 && (!board[row][column+1].p || board[row][column+1].p && board[row][column+1].c !== board[row][column].c)) {
    steps.push({row: row, column: column+1});
  }
  // top
  if(column-1 >= 0 && (!board[row][column-1].p || board[row][column-1].p && board[row][column-1].c !== board[row][column].c)) {
    steps.push({row: row, column: column-1});
  }
  // top right
  if(row+1 < 8 && column-1 >= 0 && (!board[row+1][column-1].p || board[row+1][column-1].p && board[row+1][column-1].c !== board[row][column].c)) {
    steps.push({row: row+1, column: column-1});
  }
  // top left
  if(row-1 >= 0 && column-1 >= 0 && (!board[row-1][column-1].p || board[row-1][column-1].p && board[row-1][column-1].c !== board[row][column].c)) {
    steps.push({row: row-1, column: column-1});
  }
  // bottom right
  if(row+1 < 8 && column+1 < 8 && (!board[row+1][column+1].p || board[row+1][column+1].p && board[row+1][column+1].c !== board[row][column].c)) {
    steps.push({row: row+1, column: column+1});
  }
  // bottom left
  if(row-1 >= 0 && column+1 < 8 && (!board[row-1][column+1].p || board[row-1][column+1].p && board[row-1][column+1].c !== board[row][column].c)) {
    steps.push({row: row-1, column: column+1});
  }

  return steps;
}
// const KnightController = require('./cell/pieces/knight/knight.controller.ts');
function KnightController(row, column, board) {
  let steps = [];
  const color = board[row][column].c;
  // top -|-
  if(column-2 >= 0) {
    if(row+1 < 8 && board[row+1][column-2].c !== color) {
      steps.push({row: row+1, column: column-2});
    }
    if(row-1 >= 0 && board[row-1][column-2].c !== color) {
      steps.push({row: row-1, column: column-2});
    }
  }
  // left |--
  if(row-2 >= 0) {
    if(column+1 < 8 && board[row-2][column+1].c !== color) {
      steps.push({row: row-2, column: column+1});      
    }
    if(column-1 >= 0 && board[row-2][column-1].c !== color) {
      steps.push({row: row-2, column: column-1});
    }
  }
  // right --|
  if(row+2 < 8) {
    if(column+1 < 8 && board[row+2][column+1].c !== color) {
      steps.push({row: row+2, column: column+1});
    }
    if(column-1 >= 0 && board[row+2][column-1].c !== color) {
      steps.push({row: row+2, column: column-1});
    }
  }
  // bottom _|_
  if(column+2 < 8) {
    if(row+1 < 8 && board[row+1][column+2].c !== color) {
      steps.push({row: row+1, column: column+2});
    }
    if(row-1 >= 0 && board[row-1][column+2].c !== color) {
      steps.push({row: row-1, column: column+2});
    }
  }

  return steps;
}
// const PawnController = require('./cell/pieces/pawn/pawn.controller.ts');
function PawnController(row, column, board) {
  let steps = [];
  const color = board[row][column].c;

  if(color === PieceColor.White) {
    // front movement
    if(row-1 >= 0 && !board[row-1][column].p) {
      steps.push({row: row-1, column: column});
      if(row-2 >= 0 && board[row][column].f && !board[row-2][column].p) {
        steps.push({row: row-2, column: column});
      }
    }
    // side killing
    // right
    if(row-1 >= 0 && column+1 < 8 && board[row-1][column+1].c === PieceColor.Black) {
      steps.push({row: row-1, column: column+1});
    }
    // left
    if(row-1 >= 0 && column-1 >= 0 && board[row-1][column-1].c === PieceColor.Black) {
      steps.push({row: row-1, column: column-1});
    }
  } else if(color === PieceColor.Black) {
    // front movement
    if(row+1 < 8 && !board[row+1][column].p) {
      steps.push({row: row+1, column: column});
      if(row+2 < 8 && board[row][column].f && !board[row+2][column].p) {
        steps.push({row: row+2, column: column});
      }
    }
    // side killing
    // right
    if(row+1 < 8 && column+1 < 8 && board[row+1][column+1].c === PieceColor.White) {
      steps.push({row: row+1, column: column+1});
    }
    // left
    if(row+1 < 8 && column-1 >= 0 && board[row+1][column-1].c === PieceColor.White) {
      steps.push({row: row+1, column: column-1});
    }
  }

  return steps;
}
// const QueenController = require('./cell/pieces/queen/queen.controller.ts');
function QueenController(row, column, board) {
  return RookController(row, column, board).concat(BishopController(row, column, board));
}
// const RookController = require('./cell/pieces/rook/rook.controller.ts');
function RookController(row, column, board) {
  let steps = [];
  const color = board[row][column].c;
  // right  
  for(let i=1; i<8; i++) {
    if (column+i < 8 && (!board[row][column+i].p || board[row][column+i].p && board[row][column+i].c !== color)) {
      steps.push({row: row, column: column+i});
      if (board[row][column+i].p && board[row][column+i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // left
  for(let i=1; i<8; i++) {
    if (column-i >= 0 && (!board[row][column-i].p || board[row][column-i].p && board[row][column-i].c !== color)) {
      steps.push({row: row, column: column-i});
      if (board[row][column-i].p && board[row][column-i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // top
  for(let i=1; i<8; i++) {
    if (row-i >= 0 && (!board[row-i][column].p || board[row-i][column].p && board[row-i][column].c !== color)) {
      steps.push({row: row-i, column: column});
      if (board[row-i][column].p && board[row-i][column].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // bottom
  for(let i=1; i<8; i++) {
    if (row+i < 8 && (!board[row+i][column].p || board[row+i][column].p && board[row+i][column].c !== color)) {
      steps.push({row: row+i, column: column});
      if (board[row+i][column].p && board[row+i][column].c !== color) {
        break;
      }
    } else {
      break;
    }
  }

  return steps;
}

const ControllerMap = {
  rook: RookController,
  king: KingController,
  pawn: PawnController,
  queen: QueenController,
  bishop: BishopController,
  knight: KnightController
}


const PieceColor = {
  Black: 'b',
  White: 'w'
}

const PieceName = {
  Pawn: 'pawn',
  Knight: 'knight',
  Bishop: 'bishop',
  King: 'king',
  Queen: 'queen',
  Rook: 'rook'
}

const pawn = PieceName.Pawn;
const knight = PieceName.Knight;
const rook = PieceName.Rook;
const bishop = PieceName.Bishop;
const king = PieceName.King;
const queen = PieceName.Queen;

const b = PieceColor.Black;
const w = PieceColor.White;

class BoardCell {
  c;
  p;
  row;
  col;
  f; // first move
}

// const START_TABLE: BoardCell[][] = [
//   [{c:b,p:rook},{c:b,p:knight},{c:b,p:bishop},{c:b,p:queen},{c:b,p:king},{c:b,p:bishop},{c:b,p:knight},{c:b,p:rook}],
//   [{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true},{c:b,p:pawn,f:true}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{}, {}, {}, {}, {}, {}, {}, {}],
//   [{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true},{c:w,p:pawn,f:true}],
//   [{c:w,p:rook},{c:w,p:knight},{c:w,p:bishop},{c:w,p:queen},{c:w,p:king},{c:w,p:bishop},{c:w,p:knight},{c:w,p:rook}]
// ];


function findSpecificKing(color, kings) {
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
function findKings(gameBoard) {
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
function checkMate(currentPlayer, board) {
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

function kingCheck(currentPlayer, board) {
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
function checksKing(row, column, board, allyKing, nextRow, nextColumn) { // TODO implement
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
function copyBoard(board) {
  let clone;
  clone = [];
  let piece;
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

const board = [
  [{c:b,p:king},{},{},{},{c:w,p:rook},{},{},{}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {c:w,p:bishop}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{c:w,p:rook},{},{},{c:w,p:queen},{c:w,p:king},{},{c:w,p:knight},{}]
];


// console.log(kingCheck(w,board));
console.log(checkMate(w,board));