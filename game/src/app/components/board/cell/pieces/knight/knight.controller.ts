export function KnightController(row: number, column: number, board): {row: number, column: number}[] {
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
