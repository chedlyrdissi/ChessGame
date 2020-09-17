import { RookController } from '../rook/rook.controller';
import { BishopController } from '../bishop/bishop.controller';

export function QueenController(row: number, column: number, board): {row: number, column: number}[] {
  return RookController(row, column, board).concat(BishopController(row, column, board));
}
