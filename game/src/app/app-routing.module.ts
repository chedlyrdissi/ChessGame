import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardModule } from '@board/board.module';
import { AuthModule } from '@auth/auth.module';
import { ProfileModule } from '@profile/profile.module';
import { BoardComponent } from '@board/board.component';
import { ActiveGamesComponent } from '@profile/active-games/active-games.component';
import { FinishedGamesComponent } from '@profile/finished-games/finished-games.component';
import { ProfileComponent } from '@profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

import { LogInService } from '@auth/log-in/log-in.service';

const routes: Routes = [
		{ path: '', component: HomeComponent, pathMatch: 'full'},
		{ path: 'active', component: ActiveGamesComponent, canActivate: [LogInService]},
		{ path: 'finished', component: FinishedGamesComponent, canActivate: [LogInService]},
		{ path: 'profile', component: ProfileComponent, canActivate: [LogInService]},
		{ path: 'tuto', component: TutorialComponent},
		{ path: 'game/:gameId', component: BoardComponent, canActivate: [LogInService]},
		{ path: '**', redirectTo: '/'},
	];

@NgModule({
  	imports: [
  		BoardModule,
  		ProfileModule,
  		RouterModule.forRoot(routes)
	],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
