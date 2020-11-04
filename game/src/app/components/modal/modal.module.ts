import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [  
    NgbModule,
    CommonModule,
    BrowserModule
  ],
  exports: [ModalComponent],
  providers: [NgbModal],
  bootstrap: [ModalComponent]
})
export class ModalModule { }
