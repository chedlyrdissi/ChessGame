import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardModule } from '@board/board.module';
import { AuthModule } from '@auth/auth.module';
import { ProfileModule } from '@profile/profile.module';

import { LogInComponent } from '@auth/log-in/log-in.component';
import { LogOutComponent } from '@auth/log-out/log-out.component';
import { RegisterComponent } from '@auth/register/register.component';

import { BoardComponent } from '@board/board.component';
import { ActiveGamesComponent } from '@profile/active-games/active-games.component';
import { FinishedGamesComponent } from '@profile/finished-games/finished-games.component';
import { ProfileComponent } from '@profile/profile.component';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
		{ path: '', component: HomeComponent, pathMatch: 'full'},
		{ path: 'auth', children: [
			{path: 'logIn', component: LogInComponent},
			{path: 'logOut', component: LogOutComponent},
			{path: 'register', component: RegisterComponent},
		]},
		{path: 'active', component: ActiveGamesComponent},
		{path: 'finished', component: FinishedGamesComponent},
		{ path: 'profile', component: ProfileComponent},
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
