export function KingController(row: number, column: number, board): {row: number, column: number}[] {
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
