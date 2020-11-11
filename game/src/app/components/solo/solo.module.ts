import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardModule } from '@board/board.module';

import { SoloComponent } from './solo.component';

@NgModule({
  declarations: [
    SoloComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BoardModule
  ],
  exports: [
    SoloComponent
  ],
  providers: [],
  bootstrap: [SoloComponent]
})
export class SoloModule { }
