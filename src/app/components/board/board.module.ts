import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiecesModule } from '@Pieces/pieces.module';
import { BoardComponent } from './board.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PiecesModule
  ],
  exports: [
    
  ],
  providers: [],
  bootstrap: []
})

export class BoardModule { }
