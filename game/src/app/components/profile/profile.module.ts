import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProfileComponent } from './profile.component';
import { ActiveGamesComponent } from './active-games/active-games.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { GameCardComponent } from './game-card/game-card.component';
import { ActiveGameCardComponent } from './active-game-card/active-game-card.component';
import { FinishedGameCardComponent } from './finished-game-card/finished-game-card.component';
import { ViewTypeComponent } from './view-type/view-type.component';

import { LogInService } from '@auth/log-in/log-in.service';
import { ActiveGameListComponent } from './active-game-list/active-game-list.component';
import { FinishedGameListComponent } from './finished-game-list/finished-game-list.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserMenuComponent,
    ViewTypeComponent,
    GameCardComponent,
    ActiveGamesComponent,
    FinishedGamesComponent,
    ActiveGameCardComponent,
    FinishedGameCardComponent,
    ActiveGameListComponent,
    FinishedGameListComponent
  ],
  imports: [
    AuthModule,
    FormsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatSlideToggleModule
  ],
  exports: [
    ProfileComponent,
    ViewTypeComponent,
    UserMenuComponent,
    GameCardComponent,
    ActiveGamesComponent,
    FinishedGamesComponent,
    ActiveGameCardComponent,
    FinishedGameCardComponent
  ],
  providers: [HttpClient, LogInService],
  bootstrap: []
})
export class ProfileModule { }
