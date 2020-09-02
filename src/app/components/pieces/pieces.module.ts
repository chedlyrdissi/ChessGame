import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieceColor } from './piece-color.enum';
import { PieceName } from './pieces-names.enum';

import { PawnComponent } from './pawn/pawn.component';
import { RookComponent } from './rook/rook.component';
import { KingComponent } from './king/king.component';
import { QueenComponent } from './queen/queen.component';
import { BishopComponent } from './bishop/bishop.component';
import { KnightComponent } from './knight/knight.component';

@NgModule({
  declarations: [
    PawnComponent,
    RookComponent,
    KingComponent,
    QueenComponent,
    BishopComponent,
    KnightComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PawnComponent,
    RookComponent,
    KingComponent,
    QueenComponent,
    BishopComponent,
    KnightComponent
  ],
  providers: [],
  bootstrap: []
})

export class PiecesModule { }
