import { PieceColor } from '../piece-color.enum';

export function PawnController(row: number, column: number, board): {row: number, column: number}[] {
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
