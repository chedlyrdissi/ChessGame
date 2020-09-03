import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiecesModule } from '../pieces/pieces.module';
import { BoardComponent } from './board.component';
import { CellComponent } from './cell/cell.component';
import { BoardService } from './board.service';

@NgModule({
  declarations: [
    BoardComponent,
    CellComponent
  ],
  imports: [
    CommonModule,
    PiecesModule
  ],
  exports: [
    BoardComponent,
    CellComponent
  ],
  providers: [BoardService],
  bootstrap: [BoardComponent]
})

export class BoardModule { }
