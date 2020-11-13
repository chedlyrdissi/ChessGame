import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LogInService } from '@auth/log-in/log-in.service';

import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
  	ProfileComponent
  ],
  imports: [  
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ProfileComponent],
  providers: [LogInService, HttpClient],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
