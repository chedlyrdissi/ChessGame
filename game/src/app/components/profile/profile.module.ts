import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { ActiveGamesComponent } from './active-games/active-games.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { GameCardComponent } from './game-card/game-card.component';
import { ActiveGameCardComponent } from './active-game-card/active-game-card.component';
import { FinishedGameCardComponent } from './finished-game-card/finished-game-card.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ActiveGamesComponent,
    FinishedGamesComponent,
    UserMenuComponent,
    GameCardComponent,
    ActiveGameCardComponent,
    FinishedGameCardComponent
  ],
  imports: [
    AuthModule,
    FormsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    ProfileComponent,
    UserMenuComponent,
    GameCardComponent,
    ActiveGamesComponent,
    FinishedGamesComponent,
    ActiveGameCardComponent,
    FinishedGameCardComponent
  ],
  providers: [HttpClient],
  bootstrap: []
})
export class ProfileModule { }
