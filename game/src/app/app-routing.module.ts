import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardModule } from './components/board/board.module';
import { AuthModule } from './components/auth/auth.module';
import { ProfileModule } from './components/profile/profile.module';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { LogOutComponent } from './components/auth/log-out/log-out.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { BoardComponent } from './components/board/board.component';
import { ActiveGamesComponent } from './components/profile/active-games/active-games.component';
import { FinishedGamesComponent } from './components/profile/finished-games/finished-games.component';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
		{ path: '', component: HomeComponent, pathMatch: 'full'},
		{ path: 'auth', children: [
			{path: 'logIn', component: LogInComponent},
			{path: 'logOut', component: LogOutComponent},
			{path: 'register', component: RegisterComponent},
		]},
		{ path: 'profile', children: [
			{path: 'active', component: ActiveGamesComponent},
			{path: 'finished', component: FinishedGamesComponent}
		]},
		{ path: 'board', component: BoardComponent},
		{ path: '**', redirectTo: '/'},
	];

@NgModule({
  	imports: [
  		AuthModule,
  		ProfileModule,
  		BoardModule,
  		RouterModule.forRoot(routes)
	],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
