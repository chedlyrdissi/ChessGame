import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BoardModule } from './components/board/board.module';
import { AuthModule } from './components/auth/auth.module';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LogInService } from '@auth/log-in/log-in.service';

import { ProfileModule } from '@profile/profile.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from './components/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    AuthModule,
    ModalModule,
    BoardModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    ProfileModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [LogInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
