import { PieceName } from './cell/pieces/pieces-names.enum';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { RookController } from './cell/pieces/rook/rook.controller';
import { QueenController } from './cell/pieces/queen/queen.controller';
import { KingController } from './cell/pieces/king/king.controller';

export const ControllerMap = {
  'bishop': BishopController,
  'rook': RookController,
  'queen': QueenController,
  'king': KingController
}
/*
export const ControllerMap = {
  PieceName.Pawn = 'pawn',
  PieceName.Knight = 'knight',
  PieceName.King = 'king',
  PieceName.Queen = 'queen',
  PieceName.Bishop: BishopController,
  PieceName.Rook: RookController
}
*/
