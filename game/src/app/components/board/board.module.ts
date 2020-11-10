import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PawnComponent } from './cell/pieces/pawn/pawn.component';
import { RookComponent } from './cell/pieces/rook/rook.component';
import { KingComponent } from './cell/pieces/king/king.component';
import { QueenComponent } from './cell/pieces/queen/queen.component';
import { BishopComponent } from './cell/pieces/bishop/bishop.component';
import { KnightComponent } from './cell/pieces/knight/knight.component';
import { CellComponent } from './cell/cell.component';
import { BoardComponent } from './board.component';

import { BoardService } from './board.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthModule } from '@auth/auth.module';
import { LogInService } from '@auth/log-in/log-in.service';

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
    CommonModule,
    AuthModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    BoardComponent
  ],
  providers: [BoardService, HttpClient, LogInService],
  bootstrap: [BoardComponent]
})

export class BoardModule { }
