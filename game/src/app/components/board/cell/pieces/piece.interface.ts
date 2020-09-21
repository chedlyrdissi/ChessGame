export interface ChessPiece {
  isBlack(): boolean;
  isWhite(): boolean;
 //  possibleSteps(row: number, column: number): {row: number, column: number}[];
}

export abstract class PieceWatcher {
  abstract setSteps(possibleSteps: {row: number, column: number}[]): void;
}


