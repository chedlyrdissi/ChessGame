import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [AuthComponent],
  providers: [HttpClient],
  bootstrap: []
})
export class AuthModule { }
