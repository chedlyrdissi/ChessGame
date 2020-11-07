import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TutorialComponent } from './tutorial.component';

@NgModule({
  declarations: [
    TutorialComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: [],
  exports: [TutorialComponent],
  bootstrap: [TutorialComponent]
})
export class TutorialModule { }
