import { PieceName } from '../pieces-names.enum';

export function BishopController(row: number, column: number, board): {row: number, column: number}[] {
  let steps = [];
  const color = board[row][column].c;
  // bottom
  // right  
  for(let i=1; i<8; i++) {
    if (row+i < 8 && column+i < 8 && (!board[row+i][column+i].p || board[row+i][column+i].p && board[row+i][column+i].c !== color)) {
      steps.push({row: row+i, column: column+i});
      if (board[row+i][column+i].c !== color) {
        break;
      }
    } else {
      break;
    }
  }
  // left
  for(let i=1; i<8; i++) {
    if (row+i < 8 && column-i >= 0 && (!board[row+i][column+i].p || board[row+i][column+i].p && board[row+i][column+i].c !== color)) {
      steps.push({row: row+i, column: column-i});
    } else {
      break;
    }
  }
  // top
  // right
  for(let i=1; i<8; i++) {
    if (row-i >= 0 && column+i < 8 && (!board[row+i][column+i].p || board[row+i][column+i].p && board[row+i][column+i].c !== color)) {
      steps.push({row: row-i, column: column+i});
    } else {
      break;
    }
  }
  // left
  for(let i=1; i<8; i++) {
    if (row-i >= 0 && column-i >= 0 && (!board[row+i][column+i].p || board[row+i][column+i].p && board[row+i][column+i].c !== color)) {
      steps.push({row: row-i, column: column-i});
    } else {
      break;
    }
  }

  return steps;
}
