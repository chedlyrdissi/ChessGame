import { PieceName, pawn, rook, queen, king, knight, bishop } from './cell/pieces/pieces-names.enum';
import { BishopController } from './cell/pieces/bishop/bishop.controller';
import { RookController } from './cell/pieces/rook/rook.controller';
import { QueenController } from './cell/pieces/queen/queen.controller';
import { KingController } from './cell/pieces/king/king.controller';
import { KnightController } from './cell/pieces/knight/knight.controller';
import { PawnController } from './cell/pieces/pawn/pawn.controller';

export const ControllerMap = {
  rook: RookController,
  king: KingController,
  pawn: PawnController,
  queen: QueenController,
  bishop: BishopController,
  knight: KnightController
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
