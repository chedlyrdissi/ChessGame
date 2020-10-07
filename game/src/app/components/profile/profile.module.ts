import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { ActiveGamesComponent } from './active-games/active-games.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ActiveGamesComponent,
    FinishedGamesComponent
  ],
  imports: [
    AuthModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    ActiveGamesComponent,
    FinishedGamesComponent,
    ProfileComponent
  ],
  providers: [HttpClient],
  bootstrap: []
})
export class ProfileModule { }
