import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LogInComponent,
    LogOutComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    LogInComponent,
    LogOutComponent,
    RegisterComponent
  ],
  providers: [HttpClient],
  bootstrap: []
})
export class AuthModule { }
