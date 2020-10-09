import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BoardModule } from './components/board/board.module';
import { AuthModule } from './components/auth/auth.module';
import { ProfileModule } from './components/profile/profile.module';

import { LogInService } from '@auth/log-in/log-in.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AuthModule,
    BoardModule,
    CommonModule,
    BrowserModule,
    ProfileModule,
    AppRoutingModule
  ],
  providers: [LogInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
