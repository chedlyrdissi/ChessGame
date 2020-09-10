export function RookController(row: number, column: number, board): {row: number, column: number}[] {
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
