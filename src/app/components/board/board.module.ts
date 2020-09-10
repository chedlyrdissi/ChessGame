import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PawnComponent } from './cell/pieces/pawn/pawn.component';
import { RookComponent } from './cell/pieces/rook/rook.component';
import { KingComponent } from './cell/pieces/king/king.component';
import { QueenComponent } from './cell/pieces/queen/queen.component';
import { BishopComponent } from './cell/pieces/bishop/bishop.component';
import { KnightComponent } from './cell/pieces/knight/knight.component';
import { CellComponent } from './cell/cell.component';
import { BoardComponent } from './board.component';

import { BoardService } from './board.service';

@NgModule({
  declarations: [
    PawnComponent,
    RookComponent,
    KingComponent,
    QueenComponent,
    BishopComponent,
    KnightComponent,
    BoardComponent,
    CellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent
  ],
  providers: [BoardService],
  bootstrap: [BoardComponent]
})

export class BoardModule { }
